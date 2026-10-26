const { chromium } = require('C:/Users/pc/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const errors = [];
  fs.mkdirSync('artifacts', { recursive: true });
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    page.on('pageerror', error => errors.push(error.message));
    await page.goto('http://localhost:3001', { waitUntil: 'networkidle' });
    assert.equal(await page.locator('#work .process-sample').count(), 4);
    assert.equal(await page.locator('#process .process-sample').count(), 5);
    assert.equal(await page.locator('.arc-work').count(), 0);
    for (const width of [1440, 768, 390]) {
      await page.setViewportSize({ width, height: 1000 });
      const expected = width < 768 ? 56 : width < 1024 ? 72 : 96;
      for (const id of ['services', 'work', 'stack', 'automation', 'process', 'contact']) {
        const padding = await page.locator('#' + id).evaluate(el => { const css = getComputedStyle(el); return [parseFloat(css.paddingTop), parseFloat(css.paddingBottom)]; });
        assert.deepEqual(padding, [expected, expected], `${id} spacing at ${width}`);
      }
      for (const id of ['work', 'process', 'services', 'automation', 'contact']) {
        await page.locator('#' + id).evaluate(el => scrollTo(0, el.getBoundingClientRect().top + scrollY - 100));
        await page.waitForTimeout(1000);
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
        await page.screenshot({ path: `artifacts/layout-${id}-${width}.png` });
      }
      const ctas = page.locator('#services .section-cta, #work .section-cta, #automation .section-cta, #process .section-cta');
      assert.equal(await ctas.count(), 4);
      for (const cta of await ctas.all()) {
        assert.equal(await cta.getAttribute('href'), '#contact');
        const size = await cta.boundingBox();
        assert.ok(size.height >= 44, 'CTA touch target');
      }
    }
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.evaluate(() => scrollTo(0, 0));
    await page.waitForTimeout(500);
    const first = page.locator('#work .process-card-slot').first();
    const top = await first.evaluate(el => el.getBoundingClientRect().top + scrollY);
    await page.evaluate(y => scrollTo(0, y - 800), top);
    await page.waitForTimeout(800);
    const before = await page.locator('#work .process-sample').first().evaluate(el => getComputedStyle(el).transform);
    await page.evaluate(y => scrollTo(0, y - 150), top);
    await page.waitForTimeout(900);
    const after = await page.locator('#work .process-sample').first().evaluate(el => getComputedStyle(el).transform);
    assert.notEqual(before, after);
    for (const img of await page.locator('#work img').all()) {
      await img.scrollIntoViewIfNeeded();
      await img.evaluate(el => el.decode());
    }
    await page.locator('#work .section-cta').click();
    await page.waitForTimeout(500);
    assert.equal(new URL(page.url()).hash, '#contact');
    assert.ok((await page.locator('#contact').boundingBox()).y >= 0);
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.waitForTimeout(400);
    assert.equal(await page.locator('#work .process-sample').first().evaluate(el => getComputedStyle(el).transform), 'none');
    assert.deepEqual(errors, []);
    console.log('PASS: matching work/process cards, section spacing at three widths, loaded project screenshots, scroll reveal, CTAs, reduced motion, no overflow or runtime errors.');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
