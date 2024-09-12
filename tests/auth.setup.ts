import { test as setup } from '@playwright/test';
import path from 'path';
import { HomePage } from '../page-objects/HomePage';
import { Header } from '../page-objects/componets/Header';
import { LoginOrRegisPage } from '../page-objects/LoginOrRegistPage';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');
let homePage: HomePage;
let header: Header;
let loginOrRegistPage: LoginOrRegisPage;

setup('Authenticate', async ({ page }) => {
  homePage = new HomePage(page);
  header = new Header(page);
  loginOrRegistPage = new LoginOrRegisPage(page);

  await homePage.visit();
  await header.clickOnAccountButton();
  await loginOrRegistPage.fillLoginForm('fibeja6956@esterace.com', '123Cropp');
  await loginOrRegistPage.submitForm();
  await loginOrRegistPage.assertLogin();

  await page.context().storageState({ path: authFile });
});
