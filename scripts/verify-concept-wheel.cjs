const { chromium } = require('C:/Users/pc/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const assert = require('node:assert/strict');

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.goto(process.env.TEST_URL || 'http://localhost:3029/', { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => {
      const gallery = document.querySelector('#concept-gallery');
      scrollTo({ top: scrollY + gallery.getBoundingClientRect().top - innerHeight * 0.3, behavior: 'instant' });
    });
    await page.waitForTimeout(300);
    const gallery = page.locator('#concept-gallery');
    const bounds = await gallery.boundingBox();
    await page.mouse.move(bounds.x + bounds.width / 2, bounds.y + bounds.height / 2);
    const initialY = await page.evaluate(() => scrollY);
    await page.mouse.wheel(0, 360);
    await page.waitForFunction(() => document.querySelector('#concept-gallery').scrollLeft > 20);
    await page.waitForFunction(previousY => scrollY > previousY + 10, initialY);

    await page.waitForTimeout(650);
    await gallery.evaluate(el => {
      el.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
      el.scrollLeft = el.scrollWidth - el.clientWidth;
    });
    await page.waitForFunction(() => {
      const el = document.querySelector('#concept-gallery');
      return el.scrollLeft + el.clientWidth >= el.scrollWidth - 3;
    });
    const endY = await page.evaluate(() => scrollY);
    await page.mouse.wheel(0, 360);
    await page.waitForFunction(previousY => scrollY > previousY + 10, endY);
    assert.ok(await gallery.evaluate(el => el.scrollLeft + el.clientWidth >= el.scrollWidth - 3), 'gallery remains at the end');
    console.log('PASS: vertical wheel moves concepts horizontally without trapping page scroll.');
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
