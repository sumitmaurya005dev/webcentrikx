const { chromium } = require('C:/Users/pc/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const assert = require('node:assert/strict');

(async () => {
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const base = process.env.TEST_URL || 'http://localhost:3040/';
  try {
    for (const width of [1440, 390]) {
      const page = await browser.newPage({ viewport: { width, height: 900 } });
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.goto(`${base}readiness`, { waitUntil: 'domcontentloaded' });
      assert.match(await page.title(), /Website & AI Readiness Checklist/);
      assert.equal(await page.locator('.readiness-row').count(), 8);
      assert.equal(await page.locator('.readiness-count').textContent(), '0 / 8');
      await page.locator('.readiness-row').first().click();
      await page.locator('.readiness-row').nth(4).click();
      assert.equal(await page.locator('.readiness-count').textContent(), '2 / 8');
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, `readiness overflow at ${width}`);
      await page.screenshot({ path: `artifacts/readiness-${width}.png`, fullPage: true });
      await page.locator('.readiness-followup input[type=email]').fill('visitor@example.com');
      await page.locator('.readiness-consent input').check();
      await page.locator('.readiness-followup button[type=submit]').click();
      await page.locator('.readiness-followup .form-feedback').waitFor();
      assert.match(await page.locator('.readiness-followup .form-feedback').textContent(), /email feedback is temporarily unavailable/i);
      assert.deepEqual(errors, []);
      await page.close();
    }

    const response = await fetch(`${base}api/readiness`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: 'visitor@example.com', consent: false, checked: [] }) });
    assert.equal(response.status, 400);

    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.goto(base, { waitUntil: 'domcontentloaded' });
    assert.equal(await page.locator('a[href="/readiness"]').count() > 0, true);
    assert.equal(await page.locator('a[href="/insights/lead-qualification"]').count() > 0, true);
    for (const path of ['insights', 'insights/lead-qualification', 'insights/workflow-handoffs']) {
      await page.goto(`${base}${path}`, { waitUntil: 'domcontentloaded' });
      assert.equal(await page.locator('h1').count(), 1);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, `${path} overflow`);
      await page.screenshot({ path: `artifacts/${path.replaceAll('/', '-')}.png`, fullPage: true });
    }
    await page.close();
    console.log('PASS: readiness checklist, lead form fallback, insight routes, and responsive layout.');
  } finally {
    await browser.close();
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
