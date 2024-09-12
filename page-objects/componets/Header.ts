import { Page, Locator } from '@playwright/test';
import { MainNavbar } from './MainNavbar';

export class Header {
  readonly page: Page;
  readonly header: Locator;
  public accountButton: Locator;
  public mainNavbar: MainNavbar;

  constructor(page: Page) {
    this.page = page;
    this.mainNavbar = new MainNavbar(page);
    this.accountButton = page.locator(
      `//button[contains(@data-testid, 'account-info-logged-false')]`,
    );
    this.header = page.locator(`//div[@id='headerWrapper']`);
  }

  public async clickOnAccountButton(): Promise<void> {
    await this.accountButton.click();
  }
}
