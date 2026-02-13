import { test, expect } from "../fixtures/baseTest";
import { URLs } from "../utils/constants";
import data from "../utils/test-data/data.json";

test.describe('Checkout Page functionalities', () => {
    test.beforeEach(async ({ homePage, page }) => {
        await page.route('**/*', (route) => {
            const url = route.request().url();
            if (
                url.includes('google-analytics') ||
                url.includes('doubleclick') ||
                url.includes('adservice') ||
                url.includes('facebook.com') ||
                url.endsWith('.mp4')
            ) {
                route.abort();
            } else {
                route.continue();
            }
        });

        await homePage.goto("/");
        await expect(homePage.homeTitle.first()).toBeVisible();
    });

    test('TC_14: Place Order: Register while Checkout', async ({ homePage, productsPage, viewCartPage, loginPage, signupPage, accountCreatedPage, paymentPage, paymentDonePage, deleteAccountPage, checkoutPage }) => {
        const numberOfProducts = 4;
        const dynamicEmail = data.newUser.emailAddress.replace("@", "+" + Date.now() + "@");
        await homePage.clickProducts();
        await productsPage.waitForLoad();
        await expect(productsPage.allProductsTitle).toBeVisible();
        await productsPage.addProductsToCart(numberOfProducts);
        await productsPage.clickContinueButton();
        await productsPage.clickCart();
        await viewCartPage.waitForLoad();
        await viewCartPage.clickOnCheckout();
        await viewCartPage.clickOnRegisterLogin();
        await loginPage.expectUrl(URLs.login);
        await expect(loginPage.loginHeading).toBeVisible();
        await loginPage.signup(data.newUser.userName, dynamicEmail);
        await signupPage.fillAccountInfo(data.newUser);
        await signupPage.clickOnCreateAccount();
        await accountCreatedPage.expectAccountCreatedVisible();
        await accountCreatedPage.clickContinue();
        await homePage.expectLoginUserVisible(data.newUser.userName);
        await homePage.clickCart();
        await viewCartPage.waitForLoad();
        await viewCartPage.clickOnCheckout();
        await checkoutPage.verifyDeliveryAddressDetails(data.newUser);
        await checkoutPage.fillComment(data.comment);
        await checkoutPage.clickOnPlaceOrder();
        await paymentPage.enterPaymentDetails(data.paymentDetails);
        await paymentPage.clickOnPay();
        await expect(paymentDonePage.successOrderMessage).toBeVisible();
        await paymentDonePage.clickDeleteAccount();
        await expect(deleteAccountPage.accountDeletedTitle).toBeVisible();

    });

    test('TC_15: Place Order: Register before Checkout', async ({ homePage, loginPage, signupPage, accountCreatedPage, productsPage, viewCartPage, checkoutPage, paymentPage, paymentDonePage, deleteAccountPage }) => {
        const dynamicEmail = data.newUser.emailAddress.replace("@", "+" + Date.now() + "@");
        const numberOfProducts = 3;
        await homePage.clickSignupLogin();
        await loginPage.signup(data.newUser.userName, dynamicEmail);
        await signupPage.fillAccountInfo(data.newUser);
        await signupPage.clickOnCreateAccount();
        await accountCreatedPage.clickContinue();
        await homePage.expectLoginUserVisible(data.newUser.userName);
        await homePage.clickProducts();
        await productsPage.waitForLoad();
        await expect(productsPage.allProductsTitle).toBeVisible();
        await productsPage.addProductsToCart(numberOfProducts);
        await productsPage.clickContinueButton();
        await productsPage.clickCart();
        await viewCartPage.waitForLoad();
        await viewCartPage.clickOnCheckout();
        await checkoutPage.verifyDeliveryAddressDetails(data.newUser);
        await checkoutPage.fillComment(data.comment);
        await checkoutPage.clickOnPlaceOrder();
        await paymentPage.enterPaymentDetails(data.paymentDetails);
        await paymentPage.clickOnPay();
        await expect(paymentDonePage.successOrderMessage).toBeVisible();
        await paymentDonePage.clickDeleteAccount();
        await expect(deleteAccountPage.accountDeletedTitle).toBeVisible();

    });

    test('TC_16: Place Order: Login before Checkout', async ({ homePage, loginPage, productsPage, viewCartPage, checkoutPage, paymentPage, paymentDonePage }) => {
        const numberOfProducts = 2;
        await homePage.clickSignupLogin();
        await loginPage.loginUser(data.existingUser.emailAddress, data.existingUser.password);
        await homePage.clickProducts();
        await productsPage.waitForLoad();
        await expect(productsPage.allProductsTitle).toBeVisible();
        await productsPage.addProductsToCart(numberOfProducts);
        await productsPage.clickContinueButton();
        await productsPage.clickCart();
        await viewCartPage.waitForLoad();
        await viewCartPage.clickOnCheckout();
        await checkoutPage.verifyDeliveryAddressDetails(data.existingUser);
        await checkoutPage.fillComment(data.comment);
        await checkoutPage.clickOnPlaceOrder();
        await paymentPage.enterPaymentDetails(data.paymentDetails);
        await paymentPage.clickOnPay();
        await expect(paymentDonePage.successOrderMessage).toBeVisible();
    });

    test('TC_23: Verify address details in checkout page', async ({ homePage, loginPage, signupPage, productsPage, viewCartPage, checkoutPage, accountCreatedPage, deleteAccountPage }) => {
        const dynamicEmail = data.newUser.emailAddress.replace("@", "+" + Date.now() + "@");
        const numberOfProducts = 2;
        await homePage.clickSignupLogin();
        await loginPage.signup(data.newUser.userName, dynamicEmail);
        await signupPage.fillAccountInfo(data.newUser);
        await signupPage.clickOnCreateAccount();
        await accountCreatedPage.expectAccountCreatedVisible();
        await accountCreatedPage.clickContinue();
        await homePage.expectLoginUserVisible(data.newUser.userName);
        await homePage.clickProducts();
        await productsPage.waitForLoad();
        await productsPage.addProductsToCart(numberOfProducts);
        await productsPage.clickContinueButton();
        await productsPage.clickCart();
        await viewCartPage.waitForLoad();
        await viewCartPage.clickOnCheckout();
        await checkoutPage.verifyDeliveryAddressDetails(data.newUser);
        await checkoutPage.verifyBillingAddressDetails(data.newUser);
        await checkoutPage.clickDeleteAccount();
        await expect(deleteAccountPage.accountDeletedTitle).toBeVisible();
    });

    test('TC_24: Download Invoice after purchase order', async ({
        page, homePage, productsPage, viewCartPage, loginPage, signupPage, accountCreatedPage, checkoutPage, paymentPage, paymentDonePage, deleteAccountPage
    }) => {
        const dynamicEmail = data.newUser.emailAddress.replace("@", "+" + Date.now() + "@");
        const numberOfProducts = 3;
        await homePage.clickProducts();
        await productsPage.waitForLoad();
        await productsPage.addProductsToCart(numberOfProducts);
        await productsPage.clickContinueButton();
        await productsPage.clickCart();
        await viewCartPage.waitForLoad();
        await viewCartPage.clickOnCheckout();
        await viewCartPage.clickOnRegisterLogin();
        await loginPage.signup(data.newUser.userName, dynamicEmail);
        await signupPage.fillAccountInfo(data.newUser);
        await signupPage.clickOnCreateAccount();
        await accountCreatedPage.expectAccountCreatedVisible();
        await accountCreatedPage.clickContinue();
        await homePage.expectLoginUserVisible(data.newUser.userName);
        await homePage.clickCart();
        await viewCartPage.waitForLoad();
        await viewCartPage.clickOnCheckout();
        await checkoutPage.waitForUrl(URLs.checkout);
        await checkoutPage.verifyDeliveryAddressDetails(data.newUser);
        await checkoutPage.fillComment(data.comment);
        await checkoutPage.clickOnPlaceOrder();
        await paymentPage.enterPaymentDetails(data.paymentDetails);
        await paymentPage.clickOnPay();
        await expect(paymentDonePage.successOrderMessage).toBeVisible();
        const downloadPromise = page.waitForEvent('download');
        await paymentPage.clickOnDownloadInvoice();
        const download = await downloadPromise;
        expect(download.suggestedFilename()).toContain('.txt');
        await paymentPage.clickOnContinue();
        await paymentDonePage.clickDeleteAccount();
        await expect(deleteAccountPage.accountDeletedTitle).toBeVisible();
    });

});