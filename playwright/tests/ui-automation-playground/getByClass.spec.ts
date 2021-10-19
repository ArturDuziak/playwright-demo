import { test } from "@playwright/test";

test("Gets button by one of the classes", async ({ page }) => {
  await page.goto("http://www.uitestingplayground.com/classattr");

  await page.click('.class2')
});
