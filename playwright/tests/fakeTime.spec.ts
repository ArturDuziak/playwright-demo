import { test, expect } from '@playwright/test';
import path from 'path';

test.use({ timezoneId: 'Europe/London' });
test('Controlling clock using external package', async ({ browserName, context, page }) => {
  test.skip(browserName == 'webkit', 'addInitScript cannot be used in safari browser');

  await context.addInitScript({
    path: path.join(__dirname, '../../', './node_modules/sinon/pkg/sinon.js'),
  });
  await context.addInitScript(() => {
    // @ts-expect-error
    window.__clock = sinon.useFakeTimers();
  });

  page.goto('http://time-time.net/timer/digital-clock.php');

  const timer = page.locator('#timenow');

  await expect(timer).toContainText('1:00:00');
  // @ts-expect-error
  await page.evaluate(() => window.__clock.tick(60 * 60 * 1000));
  await expect(timer).toContainText('2:00:00');
});
