import { Page } from '@playwright/test';

export class MainNavbar {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  public async clickOnCategories(tabNane: string): Promise<void> {
    const XPath = this.getXPathForCategories(tabNane);
    await this.page.click(XPath);
  }

  public async clickOnSubcategories(index: number): Promise<void> {
    const XPath = this.getXPathForSubcategories(index);
    await this.page.click(XPath);
  }

  private getXPathForCategories(tabNane: string): string {
    return `//ul[@data-testid = 'category-list']/li/a[contains(text(), '${tabNane}')]`;
  }

  private getXPathForSubcategories(index: number): string {
    return `//section[@class='bricks']/div[@class='brick'][${index}]//a`;
  }
}
