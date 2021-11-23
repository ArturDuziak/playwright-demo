import { Locator, Page } from "@playwright/test";

export class BoardPage {
  readonly page: Page;
  private newListButton: Locator;
  private listInput: Locator;
  private saveListButton: Locator;
  private newTaskButton: Locator;
  private taskInput: Locator;
  private addTaskButton: Locator;
  readonly listName: Locator;
  readonly task: Locator;

  constructor(page: Page) {
    this.page = page;
    this.newListButton = page.locator("[data-cy=add-list]");
    this.listInput = page.locator("[data-cy=add-list-input]");
    this.saveListButton = page.locator("[data-cy=save]");
    this.newTaskButton = page.locator('[data-cy="new-task"]');
    this.taskInput = page.locator('[data-cy="task-input"]');
    this.addTaskButton = page.locator('[data-cy="add-task"]');
    this.listName = page.locator('[data-cy="list-name"]');
    this.task = page.locator('[data-cy="task"]');
  }

  async goTo(boardId: number) {
    await this.page.goto(`/board/${boardId}`);
  }

  async addListToBoard(listTitle: string) {
    await this.newListButton.click();
    await this.listInput.type(listTitle);
    await this.saveListButton.click();
  }

  async addTaskToList(taskTitle: string, { withKeyPress = false } = {}) {
    await this.newTaskButton.click();
    await this.taskInput.type(taskTitle);
    withKeyPress ? await this.taskInput.press("Enter") : await this.addTaskButton.click();
  }
}
