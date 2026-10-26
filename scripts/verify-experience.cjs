const { chromium } = require('C:/Users/pc/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs = require('node:fs');
const assert = require('node:assert/strict');
const base = process.env.PREVIEW_URL || 'http://localhost:3001';

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const errors = [];
  fs.mkdirSync('artifacts', { recursive: true });
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(base, { waitUntil: 'networkidle' });
    await page.locator('#your-next-chapter').scrollIntoViewIfNeeded();
    await page.getByRole('button', { name: 'The overwhelm', exact: true }).click();
    await page.waitForTimeout(950);
    await page.screenshot({ path: 'artifacts/story-before.png' });
    await page.getByRole('button', { name: 'Play story', exact: true }).click();
    await page.waitForTimeout(4800);
    assert.equal(await page.locator('.story-number').innerText(), '02 / 03');
    await page.getByRole('button', { name: 'Room to grow', exact: true }).click();
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'artifacts/story-after.png' });
    await page.getByRole('button', { name: 'Replay story', exact: true }).click();
    assert.equal(await page.locator('.story-number').innerText(), '01 / 03');
    await page.getByRole('button', { name: 'Pause story', exact: true }).click();
    await page.waitForTimeout(4700);
    assert.equal(await page.locator('.story-number').innerText(), '01 / 03');
    const positions = await page.locator('#process .process-card-slot').evaluateAll(elements => elements.map(el => el.getBoundingClientRect().top + scrollY));
    assert.equal(positions.length, 5);
    await page.evaluate(y => scrollTo(0, y - 800), positions[0]);
    await page.waitForTimeout(750);
    const before = await page.locator('#process .process-sample').first().evaluate(el => getComputedStyle(el).transform);
    for (let index = 0; index < positions.length; index++) {
      await page.evaluate(y => scrollTo(0, y - 150), positions[index]);
      await page.waitForTimeout(1000);
      await page.locator('#process .sample-screenshot').nth(index).evaluate(img => img.decode());
      await page.screenshot({ path: `artifacts/process-${index + 1}.png` });
    }
    await page.evaluate(y => scrollTo(0, y - 150), positions[0]);
    await page.waitForTimeout(1000);
    const after = await page.locator('#process .process-sample').first().evaluate(el => getComputedStyle(el).transform);
    assert.notEqual(before, after, 'Process cards should move with scrolling');
    const footerTop = await page.locator('.brand-footer').evaluate(el => el.getBoundingClientRect().top + scrollY);
    await page.evaluate(y => scrollTo(0, y - 950), footerTop);
    await page.waitForTimeout(900);
    const footerBefore = await page.locator('.footer-wordmark').evaluate(el => getComputedStyle(el).transform);
    await page.evaluate(() => scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(1000);
    const footerAfter = await page.locator('.footer-wordmark').evaluate(el => getComputedStyle(el).transform);
    assert.notEqual(footerBefore, footerAfter, 'Footer should animate on scroll');
    await page.screenshot({ path: 'artifacts/footer-scroll.png' });
    for (const width of [1440, 1024, 768, 390, 360]) {
      await page.setViewportSize({ width, height: 900 });
      await page.locator('#your-next-chapter').scrollIntoViewIfNeeded();
      await page.waitForTimeout(350);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, `Overflow at ${width}px`);
      if (width === 390) {
        await page.screenshot({ path: 'artifacts/story-mobile.png' });
        await page.locator('.process-card-slot').nth(2).scrollIntoViewIfNeeded();
        await page.waitForTimeout(900);
        await page.screenshot({ path: 'artifacts/process-mobile.png' });
      }
    }
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.waitForTimeout(400);
    assert.equal(await page.locator('.story-number').innerText(), '03 / 03');
    assert.equal(await page.locator('.story-controls').count(), 0);
    assert.equal(await page.locator('.process-card-slot').first().evaluate(el => getComputedStyle(el).position), 'relative');
    assert.equal(await page.locator('.footer-wordmark').evaluate(el => getComputedStyle(el).transform), 'none');
    assert.equal(await page.locator('.ambient-wash').first().evaluate(el => getComputedStyle(el).animationName), 'none');
    assert.deepEqual(errors, []);
    console.log('PASS: five loaded sample screenshots; process and footer scroll motion; story autoplay, pause, replay; five responsive widths; reduced motion; no runtime errors.');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
