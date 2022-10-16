import { test } from "@playwright/test";

test("Clicks on button that has to be scrolled into", async ({ page }) => {
  await page.goto("http://www.uitestingplayground.com/scrollbars");

  await page.click("#hidingButton");
});
