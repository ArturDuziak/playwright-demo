import { expect, test } from "@playwright/test";
import clipboard from 'clipboardy';

test("Using external libraries you can test copy to clipboard features", async ({ page }) => {
  await page.goto('https://clipboardjs.com/');
  await page.click('#example-target button');

  const copiedText = await clipboard.read();
  expect(copiedText).toBe('https://github.com/zenorocha/clipboard.js.git');
});

