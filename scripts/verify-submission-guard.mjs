import assert from "node:assert/strict";
import { readSubmission, reserveEmailQuota, verifyBot } from "../app/api/submission-guard.js";

const request = (body, source = "198.51.100.1") => new Request("http://localhost/api/inquiry", {
  method: "POST",
  headers: { "x-real-ip": source },
  body: typeof body === "string" ? body : JSON.stringify(body),
});

assert.deepEqual(await readSubmission(request({ email: "lead@example.com" })), { email: "lead@example.com" });
await assert.rejects(readSubmission(request("x".repeat(12_001))), /body-too-large/);

assert.equal(await verifyBot(request({}), "token"), false);
process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY = "public-test-key";
process.env.TURNSTILE_SECRET_KEY = "private-test-key";
const originalFetch = globalThis.fetch;
let verified = 0;
globalThis.fetch = async (url, options) => {
  assert.equal(url, "https://challenges.cloudflare.com/turnstile/v0/siteverify");
  assert.equal(JSON.parse(options.body).secret, "private-test-key");
  verified++;
  return Response.json({ success: verified === 1 });
};
assert.equal(await verifyBot(request({}), "token"), true);
assert.equal(await verifyBot(request({}), "replayed-token"), false);
assert.equal(await verifyBot(request({}), "x".repeat(2049)), false);
globalThis.fetch = originalFetch;

for (let i = 0; i < 3; i++) assert.equal(reserveEmailQuota(request({}, "198.51.100.2"), `source${i}@example.com`), true);
assert.equal(reserveEmailQuota(request({}, "198.51.100.2"), "another@example.com"), false);
for (let i = 0; i < 3; i++) assert.equal(reserveEmailQuota(request({}, `198.51.100.${i + 10}`), "same@example.com"), true);
assert.equal(reserveEmailQuota(request({}, "198.51.100.20"), "same@example.com"), false);
for (let i = 6; i < 30; i++) assert.equal(reserveEmailQuota(request({}, `198.51.100.${i + 20}`), `global${i}@example.com`), true);
assert.equal(reserveEmailQuota(request({}, "198.51.100.99"), "last@example.com"), false);

console.log("PASS: bounded body, fail-closed challenge, replay rejection, source/email/global quotas.");
