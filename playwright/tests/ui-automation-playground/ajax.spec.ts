import { test, expect } from "@playwright/test";

test("Waits for the content to load in", async ({ page }) => {
  await page.goto("http://www.uitestingplayground.com/ajax");
  
  await expect(page.locator("#content")).not.toBeVisible();

  await page.click("#ajaxButton");

  await expect(page.locator("#content")).toBeVisible({ timeout: 17000 }); // Content will apear after 15 seconds
});
