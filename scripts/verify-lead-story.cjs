const { chromium } = require('C:/Users/pc/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const assert = require('node:assert/strict');

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  try {
    for (const width of [1440, 390]) {
      const page = await browser.newPage({ viewport: { width, height: 900 } });
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.goto(process.env.TEST_URL || 'http://localhost:3018/', { waitUntil: 'domcontentloaded' });
      const story = page.locator('.lead-story');
      await story.scrollIntoViewIfNeeded();
      await page.waitForFunction(() => document.querySelector('.lead-story-alert')?.classList.contains('is-visible'), { timeout: 17000 });
      if (await page.locator('.whatsapp-panel').count()) await page.locator('.whatsapp-panel-top button').click();
      await page.waitForTimeout(450);
      assert.equal(await story.locator('.lead-story-lane').count(), 2);
      assert.match(await story.textContent(), /No requirements captured\. The buyer keeps looking/);
      assert.match(await story.textContent(), /COMPETITOR ALERT · SITE VISIT BOOKED/);
      assert.match(await story.textContent(), /Whitefield, Bengaluru/);
      assert.match(await story.textContent(), /INR 1\.2 crore/);
      assert.match(await story.textContent(), /1,100 sq ft/);
      assert.match(await story.textContent(), /riya@example\.com/);
      assert.match(await story.textContent(), /Saturday at 11 AM/);
      assert.equal(await story.locator('.lead-story-progress button[aria-current="step"]').count(), 1);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, `overflow at ${width}`);
      await story.screenshot({ path: `artifacts/lead-story-${width}.png` });
      await story.getByRole('button', { name: 'Replay story' }).click();
      assert.equal(await story.locator('.lead-story-alert').evaluate(el => el.classList.contains('is-visible')), false);
      assert.doesNotMatch(await story.locator('.lead-story-alert').textContent(), /INR 1\.2 crore/);
      await story.getByRole('button', { name: 'Pause story' }).click();
      const paused = await story.locator('.lead-story-progress').getAttribute('aria-label');
      await page.waitForTimeout(1700);
      assert.equal(await story.locator('.lead-story-progress').getAttribute('aria-label'), paused);
      await story.getByRole('button', { name: 'Show story step 8' }).click();
      assert.equal(await story.locator('.lead-story-alert').evaluate(el => el.classList.contains('is-visible')), true);
      assert.deepEqual(errors, []);
      await page.close();
    }
    const page = await browser.newPage({ viewport: { width: 390, height: 900 }, reducedMotion: 'reduce' });
    await page.goto(process.env.TEST_URL || 'http://localhost:3018/', { waitUntil: 'domcontentloaded' });
    await page.locator('.lead-story').scrollIntoViewIfNeeded();
    await page.locator('.lead-story-alert.is-visible').waitFor();
    assert.equal(await page.locator('.lead-story-play').textContent(), 'Replay story');
    await page.close();
    console.log('PASS: lead comparison autoplay, controls, competitor alert, reduced motion, desktop and mobile.');
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
