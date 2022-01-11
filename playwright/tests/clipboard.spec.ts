import { expect, test } from "@playwright/test";

test("Using evaluate you can access clipboard value on chrome", async ({ browserName, page, context }) => {
  test.skip(browserName !== 'chromium', 'You can easily access clipboard only on chrome browser');

  await context.grantPermissions(['clipboard-read']);

  await page.goto('https://clipboardjs.com/');
  await page.click('#example-target button');

  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe('https://github.com/zenorocha/clipboard.js.git');
});

