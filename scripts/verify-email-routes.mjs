import assert from "node:assert/strict";
import { mock } from "node:test";
import nodemailer from "nodemailer";
import { hasEmailConfig, sendOwnerEmail } from "../app/api/notify-owner.js";

process.env.HOSTINGER_EMAIL = "hello@webcentrikx.com";
process.env.HOSTINGER_EMAIL_PASSWORD = "test-password";
process.env.INQUIRY_TO_EMAIL = "hello@webcentrikx.com";

const sent = [];
let reject = false;
mock.method(nodemailer, "createTransport", options => {
  assert.equal(options.host, "smtp.hostinger.com");
  assert.equal(options.port, 465);
  assert.equal(options.secure, true);
  assert.deepEqual(options.auth, { user: "hello@webcentrikx.com", pass: "test-password" });
  return { sendMail: async message => {
    if (reject) throw new Error("SMTP unavailable");
    sent.push(message);
  } };
});

const notification = {
  email: "visitor@example.com",
  subject: "New project enquiry",
  text: "Full project details",
};
assert.equal(hasEmailConfig(), true);
await sendOwnerEmail(notification);
assert.equal(sent[0].to, "hello@webcentrikx.com");
assert.deepEqual(sent[0].from, { name: "Webcentrikx", address: "hello@webcentrikx.com" });
assert.equal(sent[0].replyTo, "visitor@example.com");
assert.equal(sent[0].subject, "New project enquiry");
assert.equal(sent[0].text, "Full project details");

reject = true;
await assert.rejects(sendOwnerEmail(notification), /SMTP unavailable/);

delete process.env.HOSTINGER_EMAIL_PASSWORD;
assert.equal(hasEmailConfig(), false);
await assert.rejects(sendOwnerEmail(notification), /Email notifications are not configured/);
console.log("PASS: Hostinger SMTP config, Reply-To, provider rejection, and missing configuration.");
