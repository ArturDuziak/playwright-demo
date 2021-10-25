import { test, expect } from "@playwright/test";

test("Checks href attribute of link and clicks on it", async ({ page }) => {
  await page.goto("http://the-internet.herokuapp.com/redirector");
  // const redirectLink = await page.$eval("#redirect", (link) => link.getAttribute("href"));
  const redirectLink = await page.getAttribute("#redirect", "href");

  expect(redirectLink).toBe("redirect");

  await page.click("#redirect");

  await expect(page).toHaveURL(/.*\/status_codes/);
});
