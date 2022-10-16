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

test("User can drag and drop lists to move them", async ({ page, browserName }) => {
  test.skip(browserName === "webkit", "Test is flaky on Safari browser");

  await addListToBoardAPI(page, board.id, "First list");
  await addListToBoardAPI(page, board.id, "Second list");

  await page.dragAndDrop('[data-cy="list-name"]', '[data-cy="list-name"] >> nth=-1');

  const [response] = await Promise.all([page.waitForResponse("**/api/boards/**"), page.reload()]);
  const boards = await response.json();

  await expect(boards.lists[0].title).toBe("Second list");
  await expect(boards.lists[1].title).toBe("First list");
});

test("User sees an error when there is network error", async ({ page }) => {
  await page.route("**/api/lists", (route) => route.abort());

  await boardPage.addListToBoard("Fail list");

  await expect(page.locator("#errorMessage")).toBeVisible();
});
