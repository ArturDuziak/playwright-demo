import { test, expect } from "@playwright/test";

test("Opens up a hover menu", async ({ page }) => {
  await page.goto("http://the-internet.herokuapp.com/jqueryui/menu");

  await expect(page.locator("text=Downloads")).not.toBeVisible();
  await page.hover("#ui-id-2");
  await expect(page.locator("text=Downloads")).toBeVisible();
  await page.hover("text=Downloads");

  await page.click("text=Excel");
});
