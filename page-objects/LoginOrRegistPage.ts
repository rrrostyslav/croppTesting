import { Page, Locator, expect } from '@playwright/test';

export class LoginOrRegisPage {
  readonly page: Page;
  readonly registrButton: Locator;
  readonly loginButton: Locator;
  readonly loginEmailInput: Locator;
  readonly loginPasswordInput: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.registrButton = page.locator(`//button[@data-selen='register-select']`);
    this.loginButton = page.locator(`//button[@data-selen='login-select']`);
    this.loginEmailInput = page.locator(`//input[@id='login[username]_id']`);
    this.loginPasswordInput = page.locator(`//input[@id='login[password]_id']`);
    this.submitButton = page.locator(`//button[@data-selen='login-submit']`);
  }

  public async fillLoginForm(email: string, password: string): Promise<void> {
    if (await this.page.locator(this.getXPathDivForm('register')).isVisible()) {
      await this.loginButton.click();
    }
    await this.loginEmailInput.fill(email);
    //fibeja6956@esterace.com
    await this.loginPasswordInput.fill(password);
    //123Cropp
  }

  public async assertLogin() {
    await expect(this.page).toHaveURL('https://www.cropp.com/ua/uk/');
  }

  public async submitForm(): Promise<void> {
    await this.submitButton.click();
  }

  private getXPathDivForm(status: string): string {
    // register or login
    return `//div[@data-active-form='${status}']`;
  }
}
