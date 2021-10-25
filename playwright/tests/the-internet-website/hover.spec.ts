import { test, expect } from "@playwright/test";

test("Hovers over an image and check if the text appears", async ({ page }) => {
  await page.goto("http://the-internet.herokuapp.com/hovers");

  await expect(page.locator("text='name: user1' >> nth=0")).not.toBeVisible();
  await page.hover("[alt='User Avatar'] >> nth=0");

  await expect(page.locator("text='name: user1' >> nth=0")).toBeVisible();
  await expect(page.locator("text='name: user2' >> nth=1")).not.toBeVisible();
  await expect(page.locator("text='name: user3' >> nth=2")).not.toBeVisible();
});
