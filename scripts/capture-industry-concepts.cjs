const { chromium } = require('C:/Users/pc/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const base = process.env.PREVIEW_URL || 'http://localhost:3000';
const names = ['atelier', 'kindred-dental', 'aura-skin', 'oakfield-school', 'northline-builders'];

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 840 }, deviceScaleFactor: 1 });
    for (const name of names) {
      await page.goto(`${base}/concepts/${name}.html`, { waitUntil: 'networkidle' });
      await page.locator('.concept-hero img').evaluate(image => image.decode());
      await page.screenshot({ path: `public/assets/sample-${name}.jpg`, type: 'jpeg', quality: 88 });
      console.log(`Captured ${name}`);
    }
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
