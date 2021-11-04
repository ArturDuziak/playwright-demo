import { test, expect } from "@playwright/test";
import { BoardPage } from "../../pages/BoardPage";
import { createBoard, deleteBoard } from "../../helpers/boardsAPI";
import { addListToBoardAPI } from "../../helpers/listsAPI";

let boardPage: BoardPage;
let board: { id: number };

test.beforeEach(async ({ page }) => {
  board = await createBoard(page);
  boardPage = new BoardPage(page);

  await boardPage.goTo(board.id);
});

test.afterEach(async ({ page }) => {
  await deleteBoard(page, board.id);
});

test("User can add list to a board", async () => {
  await boardPage.addListToBoard("First list");

  await expect(boardPage.listName).toBeVisible();
  await expect(boardPage.listName).toHaveCount(1);

  await boardPage.addListToBoard("Second list");

  await expect(boardPage.listName.last()).toBeVisible();
  await expect(boardPage.listName).toHaveCount(2);
});

test("User can add tasks to list", async ({ page }) => {
  await addListToBoardAPI(page, board.id, "List for testing");

  await boardPage.addTaskToList("First task");

  await expect(boardPage.task).toBeVisible();
  await expect(boardPage.task).toContainText("First task");

  await boardPage.addTaskToList("Second task", { withKeyPress: true });

  await expect(boardPage.task).toHaveCount(2);
  await expect(boardPage.task.last()).toBeVisible();
  await expect(boardPage.task.last()).toContainText("Second task");
});
