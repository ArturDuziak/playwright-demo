import { test, expect } from "@playwright/test";

test("Selects option from dropdown", async ({ page }) => {
  await page.goto("http://the-internet.herokuapp.com/dropdown");

  await page.selectOption("#dropdown", { label: "Option 1" });
  // Selecting using value
  // await page.selectOption('#dropdown', '1')
});
