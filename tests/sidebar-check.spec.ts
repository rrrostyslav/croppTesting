import { expect, test } from '@playwright/test';
import { HomePage } from '../page-objects/HomePage';
import { Header } from '../page-objects/componets/Header';
import { CategoryProductsPage } from '../page-objects/CategoryProductsPage';
import { UtilTestData } from '../test-utilities/UtilTestData';
import { TestFiles } from '../common/TestFiles';
import { ClothesSideBar } from '../page-objects/componets/ClothesSidebar';

test.describe.parallel(`Check SideBar Tabs @sideBar_check`, () => {
  let homePage: HomePage;
  let header: Header;
  let categoryProductPage: CategoryProductsPage;
  let clothesSidebar: ClothesSideBar;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    header = new Header(page);
    categoryProductPage = new CategoryProductsPage(page);
    clothesSidebar = new ClothesSideBar(page);

    await homePage.visit();
    await header.mainNavbar.clickOnCategories('Чоловікам');
    await header.mainNavbar.clickOnSubcategories(2);
  });

  test(`Check Out The Sidebar Tab For Men's Shop`, async ({ page }) => {
    const expectedData = UtilTestData.getAllDataFromFile(TestFiles.SideBarTabForMen);
    const actualData = await categoryProductPage.clothesSidebar.getAllTabs();
    expect(expectedData).toStrictEqual(actualData);
  });

  test(`Check Out The Sidebar Subtab For Men's Clothing`, async ({ page }) => {
    const expectedSubtab = UtilTestData.getAllDataFromFile(TestFiles.ClothingSubtabForMen);
    const actualSubtab = await categoryProductPage.clothesSidebar.getAllActiveSubtab();
    expect(expectedSubtab).toStrictEqual(actualSubtab);
  });
});
