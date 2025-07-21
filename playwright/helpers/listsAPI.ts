import { Page } from "playwright-core";

const addListToBoard = async (page: Page, boardId: number, listTitle: string) => {
  const list = await page.request.post("/api/lists", {
    data: { boardId, title: listTitle },
  });
  return await list.json();
};

const deleteListFromBoard = async (page: Page, boardId: number) => {
  await page.request.delete(`/api/lists/${boardId}`);
};

export { addListToBoard, deleteListFromBoard };
