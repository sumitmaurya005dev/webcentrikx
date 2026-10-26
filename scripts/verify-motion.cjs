const { chromium } = require('C:/Users/pc/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs = require('node:fs');

(async () => {
  const browser = await chromium.launch({ headless: true, channel: 'msedge' });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  fs.mkdirSync('artifacts', { recursive: true });
  for (const name of ['forma', 'relay']) {
    await page.goto(`http://localhost:3001/concepts/${name}.html`, { waitUntil: 'networkidle' });
    await page.screenshot({ path: `public/assets/work-${name}.png` });
  }
  await page.goto('http://localhost:3001', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1200);
  await page.screenshot({ path: 'artifacts/desktop-hero.png' });
  const firstEvent = await page.locator('.system-event').innerText();
  await page.waitForTimeout(2200);
  const nextEvent = await page.locator('.system-event').innerText();
  const workTop = await page.locator('#work').evaluate(el => el.getBoundingClientRect().top + scrollY);
  await page.evaluate(y => window.scrollTo(0, y - 600), workTop);
  await page.waitForTimeout(800);
  const initial = await page.locator('#work .process-sample').first().evaluate(el => getComputedStyle(el).transform);
  await page.evaluate(() => window.scrollBy(0, 650));
  await page.waitForTimeout(700);
  const moved = await page.locator('#work .process-sample').first().evaluate(el => getComputedStyle(el).transform);
  await page.screenshot({ path: 'artifacts/desktop-work.png' });
  await page.locator('.problem-card').first().hover();
  await page.waitForTimeout(700);
  const hoverFill = await page.locator('.problem-card').first().evaluate(el => getComputedStyle(el, '::before').transform);
  await page.locator('.brand-footer').scrollIntoViewIfNeeded();
  await page.screenshot({ path: 'artifacts/desktop-footer.png' });
  const desktopOverflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth);
  const images = await page.locator('#work img').evaluateAll(els => els.every(el => el.complete && el.naturalWidth > 0));
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('http://localhost:3001', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'artifacts/mobile-hero.png', fullPage: true });
  const mobileOverflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.waitForTimeout(300);
  const reduced = await page.locator('.stack-animated, .agency-cursor').count();
  console.log(JSON.stringify({ errors, heroChanges: firstEvent !== nextEvent, workReveals: initial !== moved, hoverFill, images, desktopOverflow, mobileOverflow, reducedMotionEffectsRemaining: reduced }, null, 2));
  await browser.close();
  if (errors.length || desktopOverflow || mobileOverflow || !images || reduced) process.exitCode = 1;
})().catch(error => { console.error(error); process.exitCode = 1; });
