import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { ProductsPage } from "../pages/ProductsPage";
import { ViewCartPage } from "../pages/ViewCartPage";
import { ProductDetailsPage } from "../pages/ProductDetails";
import { LoginPage } from "../pages/LoginPage";
import { URLs } from "../utils/constants";
import data from "../utils/test-data/data.json";

test.describe('Cart Page functionalities', () => {

    let homePage: HomePage;
    let productsPage: ProductsPage;
    let viewCartPage: ViewCartPage;
    let productDetailsPage: ProductDetailsPage;
    let loginPage: LoginPage

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
        productDetailsPage = new ProductDetailsPage(page);
        productsPage = new ProductsPage(page);
        viewCartPage = new ViewCartPage(page);
        loginPage = new LoginPage(page);
        await homePage.goto("/");
        await expect(homePage.homeTitle.first()).toBeVisible();
    });

    test('TC_11: Verify Subscription in Cart page', async () => {
        await homePage.clickCart();
        await expect(viewCartPage.subscriptionTitle).toBeVisible();
        await viewCartPage.subscribe(data.subscribeEmail);
        await expect(viewCartPage.successSubscriptionMessage).toBeVisible();
    });

    test('TC_12: Add Products in Cart', async () => {
        const numberOfProducts = 3;

        await homePage.clickProducts();
        await productsPage.waitForLoad();
        await expect(productsPage.allProductsTitle).toBeVisible();

        await productsPage.addProductsToCart(numberOfProducts);
        await productsPage.clickViewCartLink();

        await expect(viewCartPage.cartTable).toBeVisible();
        await expect(viewCartPage.productRows).toHaveCount(numberOfProducts);
        await viewCartPage.verifyProductDetails(numberOfProducts);
    });

    test('TC_13: Verify Product quantity in Cart', async () => {
        const productNumber = 1;
        const quantity = "4";

        await homePage.viewProduct(productNumber);
        await productDetailsPage.waitForLoad();
        await productDetailsPage.increaseQuantityProduct(quantity);
        await productDetailsPage.clickOnAddToCart();
        //await productDetailsPage.waitModalToBeVisible();
        await productDetailsPage.clickOnViewCart();
        await expect(viewCartPage.cartTable).toBeVisible();
        await expect(viewCartPage.quantityText).toHaveText(quantity);
    });

    test('TC_17: Remove Products From Cart', async () => {
        const numberOfProducts = 5;
        const removedProducts = 2;

        await homePage.clickProducts();
        await productsPage.waitForLoad();
        await expect(productsPage.allProductsTitle).toBeVisible();
        await productsPage.addProductsToCart(numberOfProducts);
        await productsPage.clickContinueButton();
        await productsPage.clickCart();

        await viewCartPage.waitForLoad();
        //await viewCartPage.expectUrl(URLs.viewCart);
        await viewCartPage.deleteProducts(removedProducts);

        await viewCartPage.clickHome();
        //await homePage.expectUrl(URLs.home)
        await homePage.clickCart();

        await expect(viewCartPage.cartTable).toBeVisible();
        await viewCartPage.verifyProductRemoval(numberOfProducts, removedProducts);
    });

    test('TC_20: Search Products and Verify Cart After Login', async () => {
        await homePage.clickProducts();
        await productsPage.waitForLoad();
        //await expect(productsPage.allProductsTitle).toBeVisible();
        await productsPage.searchProduct(data.products.searchProduct);
        await productsPage.waitForLoad();
        const productsFound = await productsPage.expectSearchedProductsAreVisible(data.products.searchProduct);
        await productsPage.addProductsToCart(productsFound);
        await productsPage.clickContinueButton();
        await productsPage.clickCart();

        await expect(viewCartPage.cartTable).toBeVisible();
        await viewCartPage.expectProductsToBeVisibleInCart(productsFound);

        await viewCartPage.clickSignupLogin();
        await loginPage.loginUser(data.existingUser.emailAddress, data.existingUser.password);
        await homePage.expectLoginUserVisible(data.existingUser.userName);

        await homePage.clickCart();

        await viewCartPage.waitForLoad();
        await expect(viewCartPage.cartTable).toBeVisible();
        await viewCartPage.expectProductsToBeVisibleInCart(productsFound);

        await viewCartPage.deleteProducts(productsFound);

    });
    test('TC_22: Add to cart from Recommended items', async () => {
        await homePage.scrollDown();
        await expect(homePage.recommendedItemsTitle).toBeVisible();

        const productName = await homePage.addRecommendedItemThenViewCart();
        if (!productName) throw new Error("No se pudo obtener el nombre del producto recomendado");

        await expect(viewCartPage.productDescriptionTextList.first()).toContainText(productName);

    });

});

