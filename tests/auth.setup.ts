import { test as setup } from '@playwright/test';
import { LoginPage } from '@pages/login.page';
import { usersAuth } from '@data/usersAuth';

const authFile = 'playwright/.auth/user.json';

setup('authenticate user', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.login(usersAuth.USER.username, usersAuth.USER.password);

    await page.context().storageState({ path: authFile });
    console.log('Auth file:', authFile);
});
