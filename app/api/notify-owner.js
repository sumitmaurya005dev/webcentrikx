import nodemailer from "nodemailer";

export function hasEmailConfig() {
  return Boolean(process.env.HOSTINGER_EMAIL && process.env.HOSTINGER_EMAIL_PASSWORD && process.env.INQUIRY_TO_EMAIL);
}

export async function sendOwnerEmail({ email, subject, text }) {
  if (!hasEmailConfig()) throw new Error("Email notifications are not configured");

  const transporter = nodemailer.createTransport({
    host: "smtp.hostinger.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.HOSTINGER_EMAIL,
      pass: process.env.HOSTINGER_EMAIL_PASSWORD,
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
  });
  await transporter.sendMail({
    from: { name: "Webcentrikx", address: process.env.HOSTINGER_EMAIL },
    to: process.env.INQUIRY_TO_EMAIL,
    replyTo: email,
    subject,
    text,
  });
}
