import { expect, test } from "@playwright/test";

test("Modifies css styles of an element", async ({ page }) => {
  await page.goto("http://the-internet.herokuapp.com/dynamic_content");

  const footer = page.locator("#page-footer");

  await expect(footer).toBeVisible();
  await footer.evaluate((element) => (element.style.visibility = "hidden"));
  await expect(footer).not.toBeVisible();
});

