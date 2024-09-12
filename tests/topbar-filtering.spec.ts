import { test } from '@playwright/test';
import { HomePage } from '../page-objects/HomePage';
import { Header } from '../page-objects/componets/Header';
import { CategoryProductsPage } from '../page-objects/CategoryProductsPage';
import { ClothesPage } from '../page-objects/ClothesPage';

test.describe.parallel(`Topbar Filtering Men's Categories @topbar_filtering`, () => {
  let homePage: HomePage;
  let header: Header;
  let categoryProductPage: CategoryProductsPage;
  let clothesPage: ClothesPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    header = new Header(page);
    categoryProductPage = new CategoryProductsPage(page);
    clothesPage = new ClothesPage(page);

    await homePage.visit();
    await header.mainNavbar.clickOnCategories('Чоловікам');
    await header.mainNavbar.clickOnSubcategories(1);
  });

  test(`Filtering Чоловічі Сорочки By Valid Price`, async ({ page }) => {
    await categoryProductPage.clothesSidebar.clickOnSubtab('Одяг', 'Сорочки');
    await categoryProductPage.clothesTopbar.fillPriceForm('1000', '1399', '2');
    await categoryProductPage.clickOnClothes(1);
    await clothesPage.assertClothesPrice('1000', '1399');
  });

  test('Filtering Чоловічі Сорочки By Invalid Price', async ({ page }) => {
    await categoryProductPage.clothesSidebar.clickOnSubtab('Одяг', 'Сорочки');
    await categoryProductPage.clothesTopbar.fillPriceForm('100000', '100', '2');
    await categoryProductPage.assertTitleNoProducts();
  });

  test.only(`Filtering Чоловічі Сорочки By Colors`, async ({ page }) => {
    await categoryProductPage.clothesSidebar.clickOnSubtab('Одяг', 'Сорочки');
    // await categoryProductPage.clothesTopbar.fillColorsForm('червоний', 'зелений');
    await categoryProductPage.clothesTopbar.clickOnDropdown('Кольори');
    await categoryProductPage.clothesTopbar.checkboxDropdown.fillForm('червоний', 'зелений');
    await categoryProductPage.clickOnClothes(2);
    await clothesPage.assertClothesColor('зелений', 'червоний');
  });
});
