import { test } from "@playwright/test";

test("Drags and drops elements", async ({ page }) => {
  await page.goto("http://the-internet.herokuapp.com/drag_and_drop");

  await page.dragAndDrop('#column-a', '#column-b')
});
