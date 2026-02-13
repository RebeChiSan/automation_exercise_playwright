import { test, expect } from "../fixtures/baseTest";
import { URLs } from "../utils/constants";
import data from "../utils/test-data/data.json";

test.describe('Login and Signup User functionality', () => {
    test.beforeEach(async ({ homePage, loginPage }) => {
        await homePage.goto("/");
        await expect(homePage.homeTitle.first()).toBeVisible();
        await homePage.clickSignupLogin();
        await loginPage.expectUrl(URLs.login);
    });

    test('TC_01: Register new user', async ({ loginPage, signupPage, accountCreatedPage, deleteAccountPage }) => {
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

    test('TC_02: Login User with correct email and password', async ({ loginPage, homePage }) => {
        await expect(loginPage.loginHeading).toBeVisible();
        await loginPage.loginUser(data.existingUser.emailAddress, data.existingUser.password);
        await homePage.expectLoginUserVisible(data.existingUser.userName);
        await homePage.clickLogout();
    });

    test('TC_03: Login User with incorrect email and password', async ({ loginPage }) => {
        await expect(loginPage.loginHeading).toBeVisible();
        await loginPage.loginUser(data.wrongUser.emailAddress, data.wrongUser.password);
        await expect(loginPage.incorrectPasswordMessage).toBeVisible();
    });

    test('TC_04: Logout User', async ({ loginPage, homePage }) => {
        await expect(loginPage.loginHeading).toBeVisible();
        await loginPage.loginUser(data.existingUser.emailAddress, data.existingUser.password);
        await homePage.expectLoginUserVisible(data.existingUser.userName);
        await homePage.clickLogout();
        await expect(loginPage.loginHeading).toBeVisible();
    });

});