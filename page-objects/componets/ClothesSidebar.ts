import { Page } from '@playwright/test';

export class ClothesSideBar {
  readonly page: Page;
  readonly XPathAllTag: string = `//ul[@data-testid='sidebarSubMenu']//p/a`;
  readonly XPathAllActiveSubTag: string = `//ul[@data-testid='sidebarSubMenu']/li[@class='active']/ul/li/a`;

  constructor(page: Page) {
    this.page = page;
  }

  public async clickOnTab(tabName: string): Promise<void> {
    const XPath = this.getXPathTab(tabName);
    await this.page.click(XPath);
  }

  public async clickOnSubtab(tabName: string, subtabName: string): Promise<void> {
    if (!(await this.isTabListVisible(tabName))) {
      await this.page.click(this.getXPathTab(tabName));
    }
    await this.page.click(this.getXPathSubtab(subtabName));
  }

  public async getAllTabs(): Promise<string[]> {
    await this.page.waitForSelector(this.XPathAllTag);
    const tagsLocator = this.page.locator(this.XPathAllTag);
    const data = tagsLocator.evaluateAll(tags => tags.map(tag => tag.textContent!.trim()));
    return data;
  }

  public async getAllActiveSubtab(): Promise<string[]> {
    await this.page.waitForSelector(this.XPathAllActiveSubTag);
    const subtabsLocator = this.page.locator(this.XPathAllActiveSubTag);
    const data = subtabsLocator.evaluateAll(subtabs =>
      subtabs.map(subtab => subtab.textContent!.trim()),
    );
    return data;
  }

  private getXPathTab(tabName: string): string {
    return `//ul[@data-testid='sidebarSubMenu']//p/a[contains(text(), '${tabName}')]`;
  }

  private getXPathSubtab(subtabName: string): string {
    return `//ul[@data-testid='sidebarSubMenu']/li[@class='active']/ul/li/a[contains(text(), '${subtabName}')]`;
  }

  private async isTabListVisible(tabName: string): Promise<boolean> {
    await this.page.waitForLoadState('load');
    const XPath = `//ul[@data-testid='sidebarSubMenu']/li[@class='active']/p/a[contains(text(), '${tabName}')]`;
    return await this.page.locator(XPath).isVisible();
  }
}
