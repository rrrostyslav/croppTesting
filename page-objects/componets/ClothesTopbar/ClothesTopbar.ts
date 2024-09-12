import { Page, Locator, expect } from '@playwright/test';
import { CheckboxDropdown } from './CheckboxDropdown';
import { InputPriceDropdown } from './InputPriceDropdown';

export class ClothesTopbar {
  readonly page: Page;
  readonly categoryTitle: Locator;
  readonly checkboxDropdown: CheckboxDropdown;
  readonly inputPriceDropdown: InputPriceDropdown;

  constructor(page: Page) {
    this.page = page;
    this.categoryTitle = page.locator(`//aside[@id='categoryFilters']/../../h1`);
    this.checkboxDropdown = new CheckboxDropdown(page);
    this.inputPriceDropdown = new InputPriceDropdown(page);
  }

  public async checkCategoryTitle(titleName: string): Promise<void> {
    await expect(this.categoryTitle).toContainText(titleName);
  }

  public async clickOnDropdown(name: string): Promise<void> {
    const dropdown = this.page.locator(this.getXPathDropdown(name));
    const dropdownClass = await dropdown.getAttribute('class');
    if (!dropdownClass?.includes('active')) {
      await dropdown.click();
    }
  }

  private getXPathDropdown(name: string): string {
    return `//aside[@id='categoryFilters']//label[text()='${name}']`;
  }
}
