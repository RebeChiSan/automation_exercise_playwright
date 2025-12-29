import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { SignUpPage } from "../pages/SignUpPage";
import { DeleteAccountPage } from "../pages/DeleteAccountPage";
import { AccountCreatedPage } from "../pages/AccountCreatedPage";
import { ProductsPage } from "../pages/ProductsPage";
import { ViewCartPage } from "../pages/ViewCartPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import { PaymentPage } from "../pages/PaymentPage";
import { URLs } from "../utils/constants";
import data from "../utils/test-data/data.json";

test.describe('Checkout Page functionalities', () => {
    //test.setTimeout(180000);
    let homePage: HomePage;
    let loginPage: LoginPage;
    let signupPage: SignUpPage;
    let accountCreatedPage: AccountCreatedPage;
    let deleteAccountPage: DeleteAccountPage;
    let productsPage: ProductsPage;
    let viewCartPage: ViewCartPage;
    let checkoutPage: CheckoutPage;
    let paymentPage: PaymentPage;
    let paymentDonePage: PaymentPage;


    test.beforeEach(async ({ page }) => {
        await page.route('**/*', (route) => {
            const url = route.request().url();
            if (
                url.includes('google-analytics') ||
                url.includes('doubleclick') ||
                url.includes('adservice') ||
                url.includes('facebook.com') ||
                url.endsWith('.mp4') // Opcional: Bloquea videos pesados
            ) {
                route.abort();
            } else {
                route.continue();
            }
        });
        homePage = new HomePage(page);
        loginPage = new LoginPage(page);
        signupPage = new SignUpPage(page);
        accountCreatedPage = new AccountCreatedPage(page);
        deleteAccountPage = new DeleteAccountPage(page);
        productsPage = new ProductsPage(page);
        viewCartPage = new ViewCartPage(page);
        checkoutPage = new CheckoutPage(page);
        paymentPage = new PaymentPage(page);
        paymentDonePage = new PaymentPage(page);


        await homePage.goto("/");
        await expect(homePage.homeTitle.first()).toBeVisible();
    });

    test('TC_14: Place Order: Register while Checkout', async ({ page }) => {
        const numberOfProducts = 4;
        const dynamicEmail = data.newUser.emailAddress.replace("@", "+" + Date.now() + "@");

        await homePage.clickProducts();
        await productsPage.waitForLoad();
        await expect(productsPage.allProductsTitle).toBeVisible();
        await productsPage.addProductsToCart(numberOfProducts);
        await productsPage.clickContinueButton();
        await productsPage.clickCart();
        await viewCartPage.waitForLoad();
        //await viewCartPage.expectUrl(URLs.viewCart);
        await viewCartPage.clickOnCheckout();
        //await viewCartPage.waitModalToBeVisible();

        await viewCartPage.clickOnRegisterLogin();
        await loginPage.expectUrl(URLs.login);
        await expect(loginPage.loginHeading).toBeVisible();
        await loginPage.signup(data.newUser.userName, dynamicEmail);
        //await signupPage.expectUrl(URLs.signup);
        await signupPage.fillAccountInfo(data.newUser);
        await signupPage.clickOnCreateAccount();

        //await accountCreatedPage.expectUrl(URLs.accountCreated);
        await accountCreatedPage.expectAccountCreatedVisible();
        await accountCreatedPage.clickContinue();

        await homePage.expectLoginUserVisible(data.newUser.userName);
        await homePage.clickCart();
        await productsPage.waitForLoad();
        //await viewCartPage.expectUrl(URLs.viewCart);
        await viewCartPage.clickOnCheckout();

        //await checkoutPage.waitForUrl(URLs.checkout)
        await checkoutPage.verifyDeliveryAddressDetails(data.newUser);
        //await checkoutPage.reviewOrder();
        await checkoutPage.fillComment(data.comment);
        await checkoutPage.clickOnPlaceOrder();

        //await paymentPage.waitForUrl(URLs.payment)
        await paymentPage.enterPaymentDetails(data.paymentDetails);
        await paymentPage.clickOnPay();

        //await paymentDonePage.expectUrlToContain(URLs.paymentSuccess);
        await expect(paymentDonePage.successOrderMessage).toBeVisible();
        await paymentDonePage.clickDeleteAccount();
        await expect(deleteAccountPage.accountDeletedTitle).toBeVisible();

    });

    test('TC_15: Place Order: Register before Checkout', async () => {

        const dynamicEmail = data.newUser.emailAddress.replace("@", "+" + Date.now() + "@");
        const numberOfProducts = 3;

        await homePage.clickSignupLogin();
        //await loginPage.expectUrl(URLs.login);
        await loginPage.signup(data.newUser.userName, dynamicEmail);
        //await signupPage.expectUrl(URLs.signup);
        //await expect(signupPage.accountInfoTitle).toBeVisible();
        await signupPage.fillAccountInfo(data.newUser);
        await signupPage.clickOnCreateAccount();
        //await accountCreatedPage.expectUrl(URLs.accountCreated);
        //await accountCreatedPage.expectAccountCreatedVisible();
        await accountCreatedPage.clickContinue();

        await homePage.expectLoginUserVisible(data.newUser.userName);
        await homePage.clickProducts();
        await productsPage.waitForLoad();
        await expect(productsPage.allProductsTitle).toBeVisible();
        await productsPage.addProductsToCart(numberOfProducts);
        await productsPage.clickContinueButton();
        await productsPage.clickCart();

        await viewCartPage.waitForLoad();
        //await viewCartPage.expectUrl(URLs.viewCart)
        await viewCartPage.clickOnCheckout();

        await checkoutPage.verifyDeliveryAddressDetails(data.newUser);
        //await checkoutPage.reviewOrder();
        await checkoutPage.fillComment(data.comment);
        await checkoutPage.clickOnPlaceOrder();
        //await paymentPage.waitForLoad();

        await paymentPage.enterPaymentDetails(data.paymentDetails);
        await paymentPage.clickOnPay();
        //await paymentDonePage.waitForLoad();

        await expect(paymentDonePage.successOrderMessage).toBeVisible();
        await paymentDonePage.clickDeleteAccount();
        await expect(deleteAccountPage.accountDeletedTitle).toBeVisible();

    });

    test('TC_16: Place Order: Login before Checkout', async () => {
        const numberOfProducts = 2;

        await homePage.clickSignupLogin();
        //await loginPage.expectUrl(URLs.login);
        //await expect(loginPage.loginHeading).toBeVisible();
        await loginPage.loginUser(data.existingUser.emailAddress, data.existingUser.password);

        //await homePage.expectLoginUserVisible(data.existingUser.userName);
        await homePage.clickProducts();
        await productsPage.waitForLoad();
        await expect(productsPage.allProductsTitle).toBeVisible();
        await productsPage.addProductsToCart(numberOfProducts);
        await productsPage.clickContinueButton();
        await productsPage.clickCart();
        await viewCartPage.waitForLoad();

        //await viewCartPage.waitForUrl(URLs.viewCart)
        await viewCartPage.clickOnCheckout();
        //await checkoutPage.waitForUrl(URLs.checkout);
        await checkoutPage.verifyDeliveryAddressDetails(data.existingUser);
        await checkoutPage.fillComment(data.comment);
        await checkoutPage.clickOnPlaceOrder();

        //await paymentPage.expectUrl(URLs.payment);
        await paymentPage.enterPaymentDetails(data.paymentDetails);
        await paymentPage.clickOnPay();
        //await paymentDonePage.expectUrlToContain(URLs.paymentSuccess);
        await expect(paymentDonePage.successOrderMessage).toBeVisible();
    });

    test('TC_23: Verify address details in checkout page', async () => {
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
        //await expect(productsPage.allProductsTitle).toBeVisible();
        await productsPage.waitForLoad();
        await productsPage.addProductsToCart(numberOfProducts);
        await productsPage.clickContinueButton();
        await productsPage.clickCart();
        await viewCartPage.waitForLoad();

        //await viewCartPage.expectUrl(URLs.viewCart);
        await viewCartPage.clickOnCheckout();
        //await checkoutPage.waitForUrl(URLs.checkout);
        await checkoutPage.verifyDeliveryAddressDetails(data.newUser);
        await checkoutPage.verifyBillingAddressDetails(data.newUser);

        await checkoutPage.clickDeleteAccount();
        await expect(deleteAccountPage.accountDeletedTitle).toBeVisible();
    });

    test('TC_24: Download Invoice after purchase order', async ({ page }) => {
        const dynamicEmail = data.newUser.emailAddress.replace("@", "+" + Date.now() + "@");
        const numberOfProducts = 3;

        await homePage.clickProducts();
        //await expect(productsPage.allProductsTitle).toBeVisible();
        await productsPage.waitForLoad();
        await productsPage.addProductsToCart(numberOfProducts);
        await productsPage.clickContinueButton();
        await productsPage.clickCart();
        await viewCartPage.waitForLoad();

        //await viewCartPage.waitForUrl(URLs.viewCart)
        await viewCartPage.clickOnCheckout();
        //await viewCartPage.waitModalToBeVisible();
        await viewCartPage.clickOnRegisterLogin();

        await loginPage.signup(data.newUser.userName, dynamicEmail);
        //await signupPage.expectUrl(URLs.signup);
        // await expect(signupPage.accountInfoTitle).toBeVisible();
        await signupPage.fillAccountInfo(data.newUser);
        await signupPage.clickOnCreateAccount();
        //await accountCreatedPage.expectUrl(URLs.accountCreated);
        await accountCreatedPage.expectAccountCreatedVisible();
        await accountCreatedPage.clickContinue();

        await homePage.expectLoginUserVisible(data.newUser.userName);
        await homePage.clickCart();
        // await viewCartPage.expectUrl(URLs.viewCart)
        await viewCartPage.waitForLoad();
        await viewCartPage.clickOnCheckout();
        await checkoutPage.waitForUrl(URLs.checkout);
        await checkoutPage.verifyDeliveryAddressDetails(data.newUser);
        //await checkoutPage.reviewOrder();
        await checkoutPage.fillComment(data.comment);
        await checkoutPage.clickOnPlaceOrder();

        //await paymentPage.expectUrl(URLs.payment);
        await paymentPage.enterPaymentDetails(data.paymentDetails);
        await paymentPage.clickOnPay();

        //await paymentDonePage.expectUrlToContain(URLs.paymentSuccess);
        await expect(paymentDonePage.successOrderMessage).toBeVisible();

        const downloadPromise = page.waitForEvent('download');
        await paymentPage.clickOnDownloadInvoice();
        const download = await downloadPromise;
        expect(download.suggestedFilename()).toContain('.txt');

        await paymentDonePage.clickOnContinue();
        await paymentDonePage.clickDeleteAccount();
        await expect(deleteAccountPage.accountDeletedTitle).toBeVisible();
    });

});