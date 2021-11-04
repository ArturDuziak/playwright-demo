import { test, expect } from "@playwright/test";

test("Checks the text that sometimes has typos", async ({ page }) => {
  test.fixme();
  await page.goto("http://the-internet.herokuapp.com/typos");

  const text = page.locator("p >> nth=-1");
  await expect(text).toContainText("Sometimes you'll see a typo, other times you won't.");
});
