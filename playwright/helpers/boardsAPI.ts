import { Page } from "playwright-core";

const createBoard = async (page: Page, name = `PlaywrightBoard_${Date.now()}`) => {
  const board = await page.request.post("/api/boards", { data: { name } });
  return await board.json();
};

const deleteBoard = async (page: Page, id: number) => {
  await page.request.delete(`/api/boards/${id}`);
};

const resetBoards = async (page: Page) => {
  await page.request.delete("/api/boards");
};

export { createBoard, deleteBoard, resetBoards };
