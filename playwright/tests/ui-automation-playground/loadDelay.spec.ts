import { test } from "@playwright/test";

test("It waits for a button to be visible after a load delay", async ({ page }) => {
  await page.goto("http://www.uitestingplayground.com");

  await page.click('text="Load Delay"');
  await page.click('text="Button Appearing After Delay"');
});
