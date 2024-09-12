import { test } from '@playwright/test';
import { HomePage } from '../page-objects/HomePage';
import { Header } from '../page-objects/componets/Header';
import { CategoryProductsPage } from '../page-objects/CategoryProductsPage';

test.describe.parallel('Filtering Clothes By Subtab, @subtab_filtering', () => {
  let homePage: HomePage;
  let header: Header;
  let categoryProductsPage: CategoryProductsPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    header = new Header(page);
    categoryProductsPage = new CategoryProductsPage(page);

    await homePage.visit();
  });

  test('Filter By Чоловічі Сорочки Subtab', async ({ page }) => {
    await header.mainNavbar.clickOnCategories('Чоловікам');
    await header.mainNavbar.clickOnSubcategories(1);
    await categoryProductsPage.clothesSidebar.clickOnSubtab('Одяг', 'Сорочки');
    await categoryProductsPage.clothesTopbar.checkCategoryTitle('Чоловічі сорочки');
  });
});
