# Form notifications

Both `/api/inquiry` and `/api/readiness` email the owner when a valid form is submitted. The visitor sees success only when Hostinger SMTP accepts the message. Their email is set as Reply-To, so replying to the notification reaches the lead.

## Hostinger Email setup

1. Make sure `hello@webcentrikx.com` can receive email and sign in to Hostinger Webmail with it.
2. Copy `.env.example` to `.env.local`. Set `HOSTINGER_EMAIL_PASSWORD` to the password for this **mailbox**, not your Hostinger account. If the password contains `$`, escape each one as `\$` in `.env.local` because Next.js expands dollar-prefixed values. Leave `HOSTINGER_EMAIL` and `INQUIRY_TO_EMAIL` as `hello@webcentrikx.com`, or change the latter to the inbox where you want alerts.
3. Restart the development server after saving `.env.local`. Submit a test project enquiry and readiness follow-up, then confirm both messages arrive and Reply-To points to the visitor's email.
4. Add the same three variables to the deployment platform's **server-side environment variables** before publishing. Enter the mailbox password exactly as it is there, without the `.env.local` escape backslash. A local `.env.local` does not configure production. Restart the deployed app after changing runtime variables.

The sender uses Hostinger's `smtp.hostinger.com` on SSL port `465`. No Resend account or extra mailbox is needed. Do not put the mailbox password in client-side code, chat, or Git. `.env.local` is ignored by this repository. The form reports an error if SMTP is not configured or rejects the request.

## Anti-spam protection

Both public email forms now require a successful Cloudflare Turnstile check before SMTP. Create a Turnstile widget at Cloudflare, allow your production domain (and `localhost` for local tests), and set `NEXT_PUBLIC_TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY` in `.env.local` and the production environment. Restart or redeploy after setting them. **Until both keys are set, both email forms intentionally stop sending.** The direct email address and Calendly booking remain available.

The app also rejects bodies over 12 KB and caps accepted email sends per running server process: 3 per source per hour, 3 per submitted email per day, and 30 total per day. Quotas are reserved before SMTP. These process-local caps reset on restart and are not shared across scaled instances. For a hard deployment-wide cap, put the site behind a trusted edge rate limit or add a shared durable rate-limit store before increasing traffic. Turnstile and the server-side caps substantially reduce abuse but cannot guarantee zero spam.
