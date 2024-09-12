import { Page, Locator, expect } from '@playwright/test';
import { CheckboxDropdown } from './CheckboxDropdown';

export class ClothesTopbar {
  readonly page: Page;
  readonly categoryTitle: Locator;
  readonly priceDropbox: Locator;
  readonly hasDiscountCheckbox: Locator;
  readonly colorsDropbox: Locator;
  readonly submitButton: Locator;
  readonly clearFilterButton: Locator;
  readonly checkboxDropdown: CheckboxDropdown;

  constructor(page: Page) {
    this.page = page;
    this.categoryTitle = page.locator(`//aside[@id='categoryFilters']/../../h1`);
    this.priceDropbox = page.locator(`//aside[@id='categoryFilters']//label[text()='Ціна']`);
    this.hasDiscountCheckbox = page.locator(`#priceshasDiscount`);
    this.colorsDropbox = page.locator(`//aside[@id='categoryFilters']//label[text()='Кольори']`);
    this.submitButton = page.locator(`//ul[contains(@class, 'opened')]//button`);
    this.clearFilterButton = page.locator(`button[type=reset]`);
    this.checkboxDropdown = new CheckboxDropdown(page);
  }

  public async checkCategoryTitle(titleName: string): Promise<void> {
    await expect(this.categoryTitle).toContainText(titleName);
  }

  public async clickOnDropdown(name: string): Promise<void> {
    await this.page.locator(this.getXPathDropdown(name)).click();
  }

  public async fillPriceForm(
    priceFrom: string,
    priceTo: string,
    countFilter: string,
  ): Promise<void> {
    await this.priceDropbox.click();
    await this.page.locator(this.getPriceInput('From')).fill(priceFrom);
    await this.page.locator(this.getPriceInput('To')).fill(priceTo);
    await this.submitButton.click();
    await expect(this.priceDropbox).toContainText(`(${countFilter})`);
    await this.page.waitForTimeout(1000);
  }

  public async fillColorsForm(...colors: string[]): Promise<void> {
    const countColor = colors.length;
    await this.colorsDropbox.click();
    await this.clickOnColorCheckbox(colors);
    await this.submitButton.click();
    await expect(this.colorsDropbox).toContainText(`(${countColor})`);
    await this.page.waitForTimeout(1000);
  }

  private getPriceInput(input: string): string {
    return `#pricesprice${input}`;
  }

  private getXPathDropdown(name: string): string {
    return `//aside[@id='categoryFilters']//label[text()='${name}']`;
  }

  private async clickOnColorCheckbox(colors: string[]) {
    for (const color of colors) {
      await this.page.click(`//ul[contains(@class, 'colors')]/li/label[text()='${color}']/input`);
    }
  }
}
