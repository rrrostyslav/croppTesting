import { Page, Locator, expect } from '@playwright/test';
import { ClothesTopbar } from './componets/ClothesTopbar/ClothesTopbar';
import { ClothesSideBar } from './componets/ClothesSidebar';

export class CategoryProductsPage {
  readonly page: Page;
  readonly titleNoProducts: Locator;
  public clothesTopbar: ClothesTopbar;
  public clothesSidebar: ClothesSideBar;

  constructor(page: Page) {
    this.page = page;
    this.titleNoProducts = page.locator(`//*[@id="app"]/div[1]/div[2]/div[2]/div[2]/div[2]`);
    this.clothesTopbar = new ClothesTopbar(page);
    this.clothesSidebar = new ClothesSideBar(page);
  }

  public async clickOnClothes(index: number): Promise<void> {
    await this.page.click(this.getXPathProduct(index));
  }

  public async assertTitleNoProducts() {
    await expect(this.titleNoProducts).toContainText(
      `Немає товарів, що відповідають цим критеріям.`,
    );
  }

  private getXPathProduct(index: number): string {
    return `//section[@id='categoryProducts']/article[@data-id][${index}]//a`;
  }
}
