import { test, expect } from "@playwright/test";

test.describe("Main page tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("Empty main page displays create board option", async ({ page }) => {
    const createBoardTile = await page.textContent('[data-cy="create-board"] .board_title');
    expect(createBoardTile).toBe("Something that doesn't exist");
  });
});
