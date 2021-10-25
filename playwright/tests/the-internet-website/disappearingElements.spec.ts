import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://the-internet.herokuapp.com/disappearing_elements");
});

test("Check length of elemenst", async ({ page }) => {
  await expect(page.locator("ul li")).toHaveCount(5);
});

test("Click on second button", async ({ page }) => {
  const multipleElements = await page.$$("ul li");
  await multipleElements[1].click();
  await expect(page).toHaveURL(/.*\/about/);
});
