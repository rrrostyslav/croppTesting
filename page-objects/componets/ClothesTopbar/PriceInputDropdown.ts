import { Page, Locator } from '@playwright/test';

export class PriceInputDropdown {
  readonly page: Page;
  readonly submitButton: Locator;
  readonly priceDropbox: Locator;

  constructor(page: Page) {
    this.page = page;
    this.submitButton = page.locator(`//ul[contains(@class, 'opened')]//button`);
  }

  public async fillPriceForm(
    priceFrom: string,
    priceTo: string,
  ): Promise<void> {
    await this.page.locator(this.getPriceInput('From')).fill(priceFrom);
    await this.page.locator(this.getPriceInput('To')).fill(priceTo);
    await this.submitButton.click();
    await this.page.waitForTimeout(1000)
  }

  private getPriceInput(input: string): string {
    return `#pricesprice${input}`;
  }
}
