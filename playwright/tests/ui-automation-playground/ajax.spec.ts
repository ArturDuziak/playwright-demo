import { test, expect } from "@playwright/test";

test("Waits for the contenet to load in", async ({ page }) => {
  await page.goto("http://www.uitestingplayground.com/ajax");

  await page.click("#ajaxButton");

  const content = await page.waitForSelector("#content");
  expect(content).toBeTruthy()
});
