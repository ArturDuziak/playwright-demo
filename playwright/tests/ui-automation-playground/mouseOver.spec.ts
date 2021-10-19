import { test, expect } from "@playwright/test";

test("Mouse overs and clicks the elemnt two times", async ({ page }) => {
  await page.goto("http://www.uitestingplayground.com/mouseover");

  const clickCount = await page.textContent("#clickCount");
  expect(clickCount).toBe("0");

  await page.click('text="Click me"');
  await page.click('text="Click me"');

  const clickCount2 = await page.textContent("#clickCount");
  expect(clickCount2).toBe("2");
});
