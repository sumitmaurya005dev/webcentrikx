const { chromium } = require('C:/Users/pc/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const assert = require('node:assert/strict');

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  try {
    for (const width of [1388, 1024, 390]) {
      const page = await browser.newPage({ viewport: { width, height: 760 } });
      await page.goto(process.env.TEST_URL || 'http://localhost:3022/', { waitUntil: 'domcontentloaded' });
      await page.locator('.hero-call-cta').click();
      const frame = page.frameLocator('.calendly-popup-content iframe');
      await frame.locator('button[aria-label*="Times available"]').first().click({ timeout: 30000 });
      await frame.getByRole('button', { name: /^\d{1,2}:\d{2}(am|pm)$/i }).first().click();
      const next = frame.getByRole('button', { name: /^Next \d/ });
      await next.waitFor();
      await page.waitForTimeout(500);
      const popup = await page.locator('.calendly-popup').boundingBox();
      const nextBox = await next.boundingBox();
      const frameSize = await frame.locator('body').evaluate(body => ({ viewport: innerWidth, scrollWidth: body.scrollWidth }));
      await page.screenshot({ path: `artifacts/calendly-popup-${width}.png` });
      assert.ok(popup.width <= width - (width >= 768 ? 24 : 0), `popup fits viewport at ${width}`);
      assert.ok(nextBox.x >= popup.x + 8 && nextBox.x + nextBox.width <= popup.x + popup.width - 8, `Next stays inside popup at ${width}`);
      assert.ok(frameSize.scrollWidth <= frameSize.viewport + 1, `Calendly frame has no horizontal overflow at ${width}`);
      if (width >= 768) assert.ok(popup.width <= 740, `desktop popup uses compact layout at ${width}`);
      await page.close();
    }
    console.log('PASS: selected Calendly time and Next button fit at desktop, tablet, and mobile widths.');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
