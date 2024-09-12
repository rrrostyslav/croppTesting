import { Page, Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly cookieButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cookieButton = page.locator('#cookiebotDialogOkButton');
  }

  public async visit() {
    await this.page.goto('https://www.cropp.com/ua/uk/');
    await this.page.waitForLoadState('load');
    if (await this.cookieButton.isVisible()) {
      await this.cookieButton.click();
    }
  }
}
