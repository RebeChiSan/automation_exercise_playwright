import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { SignUpPage } from "../pages/SignUpPage";
import { DeleteAccountPage } from "../pages/DeleteAccountPage";
import { AccountCreatedPage } from "../pages/AccountCreatedPage";
import { URLs } from "../utils/constants";
import data from "../utils/test-data/data.json";

test.describe('Login and Signup User functionality', () => {
    let homePage: HomePage;
    let loginPage: LoginPage;
    let signupPage: SignUpPage;
    let accountCreatedPage: AccountCreatedPage;
    let deleteAccountPage: DeleteAccountPage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        loginPage = new LoginPage(page);
        signupPage = new SignUpPage(page);
        accountCreatedPage = new AccountCreatedPage(page);
        deleteAccountPage = new DeleteAccountPage(page);

        await homePage.goto("/");
        await expect(homePage.homeTitle.first()).toBeVisible();
        await homePage.clickSignupLogin();
        await loginPage.expectUrl(URLs.login);
    });

    test('TC_01: Register new user', async () => {
        const dynamicEmail = data.newUser.emailAddress.replace("@", "+" + Date.now() + "@")

        await expect(loginPage.newUserSignupHeading).toBeVisible();
        await loginPage.signup(data.newUser.userName, dynamicEmail);

        await signupPage.expectUrl(URLs.signup);
        await expect(signupPage.accountInfoTitle).toBeVisible();
        await signupPage.fillAccountInfo(data.newUser);
        await signupPage.clickOnCreateAccount();

        await accountCreatedPage.expectUrl(URLs.accountCreated);
        await accountCreatedPage.expectAccountCreatedVisible();
        await accountCreatedPage.clickContinue();

        await accountCreatedPage.clickDeleteAccount();
        await deleteAccountPage.expectUrl(URLs.deleteAccount);
        await expect(deleteAccountPage.accountDeletedTitle).toBeVisible();

    });

    test('TC_02: Login User with correct email and password', async () => {
        await expect(loginPage.loginHeading).toBeVisible();
        await loginPage.loginUser(data.existingUser.emailAddress, data.existingUser.password);

        await homePage.expectLoginUserVisible(data.existingUser.userName);
        await homePage.clickLogout();
    });

    test('TC_03: Login User with incorrect email and password', async () => {
        await expect(loginPage.loginHeading).toBeVisible();
        await loginPage.loginUser(data.wrongUser.emailAddress, data.wrongUser.password);

        await expect(loginPage.incorrectPasswordMessage).toBeVisible();
    });

    test('TC_04: Logout User', async () => {
        await expect(loginPage.loginHeading).toBeVisible();
        await loginPage.loginUser(data.existingUser.emailAddress, data.existingUser.password);

        await homePage.expectLoginUserVisible(data.existingUser.userName);
        await homePage.clickLogout();

        await expect(loginPage.loginHeading).toBeVisible();
    });

});