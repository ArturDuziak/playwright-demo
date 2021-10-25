import { test, expect } from "@playwright/test";

test("Hovers over an image and check if the text appears", async ({ page }) => {
  // Playwright engine pierces shadow dom by default
  await page.goto("http://the-internet.herokuapp.com/shadowdom");

  await expect(page.locator("ul[slot='my-text']")).toBeVisible();
  await expect(page.locator("span[slot='my-text']")).toBeVisible();
});
