import nextEnv from "@next/env";
import { sendOwnerEmail } from "../app/api/notify-owner.js";

nextEnv.loadEnvConfig(process.cwd());

const recipient = process.env.INQUIRY_TO_EMAIL;
if (recipient !== "hello@webcentrikx.com") {
  throw new Error("Test recipient must be hello@webcentrikx.com");
}

await sendOwnerEmail({
  email: recipient,
  subject: "TEST: Webcentrikx website enquiry notification",
  text: "This is a test of the website contact form's Hostinger SMTP connection. No visitor submitted this enquiry.",
});
console.log("Hostinger SMTP accepted the test message for hello@webcentrikx.com.");
