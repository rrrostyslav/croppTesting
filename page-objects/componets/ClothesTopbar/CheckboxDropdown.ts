import { Page, Locator } from '@playwright/test';

export class CheckboxDropdown {
  readonly page: Page;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.submitButton = page.locator(`//ul[contains(@class, 'opened')]//button`);
  }

  public async fillForm(...params: string[]): Promise<void> {
    for (const param of params) {
      await this.page.locator(this.getXParhCheckbox(param)).click();
    }
    await this.submitButton.click();
    await this.page.waitForTimeout(1000);
  }

  private getXParhCheckbox(param: string): string {
    return `//ul/li/label[text()='${param}']/input`;
  }
}
