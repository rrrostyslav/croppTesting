import { Page, Locator, expect } from '@playwright/test';
import { CheckboxDropdown } from './CheckboxDropdown';
import { PriceInputDropdown } from './PriceInputDropdown';
import { strict } from 'assert';

export class ClothesTopbar {
  readonly page: Page;
  readonly categoryTitle: Locator;
  readonly checkboxDropdown: CheckboxDropdown;
  readonly inputPriceDropdown: PriceInputDropdown;

  constructor(page: Page) {
    this.page = page;
    this.categoryTitle = page.locator(`//aside[@id='categoryFilters']/../../h1`);
    this.checkboxDropdown = new CheckboxDropdown(page);
    this.inputPriceDropdown = new PriceInputDropdown(page);
  }

  public async checkCategoryTitle(titleName: string): Promise<void> {
    await expect(this.categoryTitle).toContainText(titleName);
  }

  public async clickOnDropdown(name: string): Promise<void> {
    const dropdown = this.page.locator(this.getXPathDropdown(name));
    if (!(await dropdown.getAttribute('class'))?.includes('active')) {
      dropdown.click();
    }
  }

  public async assertAmountFilters(name: string, amount: number): Promise<void> {
    const dropdownText = await this.page.locator(this.getXPathDropdown(name)).textContent();
    const result = dropdownText!.match(/\d/g)?.join('');
    if (amount > 0) {
      expect(Number(result)).toEqual(amount);
    } else expect(result).toBeUndefined();
  }

  private getXPathDropdown(name: string): string {
    return `//aside[@id='categoryFilters']//label[text()='${name}']`;
  }
}
