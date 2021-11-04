import { Page } from "playwright-core";

const createBoard = async (page: Page, name: string = `PlaywrightBoard_${Date.now()}`) => {
  const board = await page.request.post("/api/boards", { data: { name } });
  return await board.json();
};

const deleteBoard = async (page: Page, id: number) => {
  await page.request.delete(`/api/boards/${id}`);
};

export { createBoard, deleteBoard };
