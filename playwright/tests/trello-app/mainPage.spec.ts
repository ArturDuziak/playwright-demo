import { test, expect } from "@playwright/test";
import { createBoard, deleteBoard } from "../../helpers/boardsAPI";

test("Empty main page displays create board option", async ({ page }) => {
  await page.route("**/api/boards", (route) => route.fulfill({ body: JSON.stringify([]) }));
  await page.goto("/");

  await expect(page.locator(".board_title")).toHaveText("Create a board...");
});

test("User can star a board", async ({ page }) => {
  const boardName = `PlaywrightBoard_${Date.now()}${Math.random()}`;
  const newBoard = await createBoard(page, boardName);

  await page.goto("/");

  await expect(page.locator(`text=${boardName}`)).toBeVisible();

  await page.request.delete(`/api/boards/${newBoard.id}`);
});
