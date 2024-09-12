import { Page, Locator, expect } from '@playwright/test';
import { UtilTestData } from '../test-utilities/UtilTestData';

export class ClothesPage {
  readonly page: Page;
  readonly price: Locator;
  readonly color: Locator;

  constructor(page: Page) {
    this.page = page;
    this.price = page.locator(`div[data-selen=product-price]`);
    this.color = page.locator(`span[data-testid=color-picker-color-name]`);
  }

  public async assertClothesPrice(priceFrom: string, priceTo: string): Promise<void> {
    const priceText = await this.price.textContent();
    const convertPrice = parseInt(UtilTestData.getConvertPrice(priceText!));
    if (parseInt(priceFrom)) {
      expect(convertPrice).toBeGreaterThanOrEqual(parseInt(priceFrom));
    }
    if (parseInt(priceTo)) {
      expect(convertPrice).toBeLessThanOrEqual(parseInt(priceTo));
    }
  }

  public async assertClothesColor(...colors: string[]): Promise<void> {
    const colorTest = await this.color.textContent();
    expect(colors).toContain(colorTest);
  }
}
