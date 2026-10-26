const MAX_BODY_BYTES = 12_000;
const LIMITS = [
  { prefix: "all", max: 30, windowMs: 24 * 60 * 60 * 1000 },
  { prefix: "source", max: 3, windowMs: 60 * 60 * 1000 },
  { prefix: "email", max: 3, windowMs: 24 * 60 * 60 * 1000 },
];

const quota = globalThis.__webcentrikxSubmissionQuota ??= new Map();

export async function readSubmission(request) {
  const reader = request.body?.getReader();
  if (!reader) throw new Error("invalid-body");
  const chunks = [];
  let length = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      length += value.byteLength;
      if (length > MAX_BODY_BYTES) throw new Error("body-too-large");
      chunks.push(value);
    }
    return JSON.parse(new TextDecoder().decode(Buffer.concat(chunks)));
  } finally {
    reader.releaseLock();
  }
}

export function hasBotProtection() {
  return Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && process.env.TURNSTILE_SECRET_KEY);
}

export async function verifyBot(request, token) {
  if (!hasBotProtection() || typeof token !== "string" || !token || token.length > 2048) return false;
  try {
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret: process.env.TURNSTILE_SECRET_KEY, response: token }),
      signal: AbortSignal.timeout(5000),
      cache: "no-store",
    });
    if (!response.ok) return false;
    const result = await response.json();
    return result.success === true;
  } catch {
    return false;
  }
}

export function reserveEmailQuota(request, email) {
  const now = Date.now();
  const source = request.headers.get("x-real-ip") || request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const keys = ["all", `source:${source}`, `email:${email.toLowerCase()}`];
  const current = LIMITS.map((limit, index) => {
    const key = keys[index];
    const existing = quota.get(key);
    return { key, limit, count: existing && existing.expires > now ? existing.count : 0, expires: existing && existing.expires > now ? existing.expires : now + limit.windowMs };
  });
  if (current.some(entry => entry.count >= entry.limit.max)) return false;
  for (const entry of current) quota.set(entry.key, { count: entry.count + 1, expires: entry.expires });
  if (quota.size > 5000) {
    for (const [key, entry] of quota) if (entry.expires <= now) quota.delete(key);
  }
  return true;
}
