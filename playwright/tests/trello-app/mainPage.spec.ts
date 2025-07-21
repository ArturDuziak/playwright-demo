import percySnapshot from "@percy/playwright";
import { test, expect } from "@playwright/test";
import { createBoard, resetBoards } from "../../helpers/boardsAPI";

test.beforeEach(async ({ page }) => {
  await resetBoards(page);
});

test("Empty main page displays create board option", async ({ page }) => {
  await page.route("**/api/boards", (route) => route.fulfill({ body: JSON.stringify([]) }));
  await page.goto("/");

  await expect(page.locator(".board_title")).toHaveText("Create a board...");
});

test("Empty main page displays correctly @visual", async ({ page }) => {
  await page.route("**/api/boards", (route) => route.fulfill({ body: JSON.stringify([]) }));
  await page.goto("/");

  await expect(page.locator(".board_title")).toBeVisible();

  await percySnapshot(page, "Main Page");
});

test("User can star a board", async ({ page }) => {
  const boardName = `PlaywrightBoard_${Date.now()}`;
  await createBoard(page, boardName);

  await page.goto("/");

  await expect(page.locator(`text=${boardName}`)).toBeVisible();

  await page.hover(`text=${boardName}`);
  await page.click(`[data-cy="board-item"]:has-text("${boardName}") [data-cy="star"]`);

  const numberOfStarredBoards = await page.$$eval(
    ':text("My Starred") + .board .board_item',
    (items) => items.length
  );

  expect(numberOfStarredBoards).toBe(1);
});
