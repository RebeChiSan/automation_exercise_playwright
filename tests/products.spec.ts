import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { ProductsPage } from "../pages/ProductsPage";
import { URLs } from "../utils/constants";
import { ProductDetailsPage } from "../pages/ProductDetails";
import data from "../utils/test-data/data.json";

test.describe('Products Page Funcionalities', () => {
    let homePage: HomePage;
    let productsPage: ProductsPage;
    let productsDetailsPage: ProductDetailsPage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        productsPage = new ProductsPage(page);
        productsDetailsPage = new ProductDetailsPage(page);

        await homePage.goto("/");
        await expect(homePage.homeTitle.first()).toBeVisible();
    });

    test('TC_08: Verify All Products and product detail page', async () => {
        await homePage.clickProducts();
        await expect(productsPage.allProductsTitle).toBeVisible();
        await productsPage.expectProductsListToBeVisible();

        await productsPage.viewFirstProduct();
        await productsDetailsPage.expectUrl(`${URLs.productDetails}1`)
        await expect(productsDetailsPage.productDetailName).toBeVisible();
        await expect(productsDetailsPage.productCategory).toBeVisible();
        await expect(productsDetailsPage.productPrice).toBeVisible();
        await expect(productsDetailsPage.productAvailability).toBeVisible();
        await expect(productsDetailsPage.productCondition).toBeVisible();
        await expect(productsDetailsPage.productBrand).toBeVisible();
    });


    test('TC_09: Search Product', async () => {
        const searchTerm = data.products.searchProduct;

        await homePage.clickProducts();
        //await expect(productsPage.allProductsTitle).toBeVisible()
        await productsPage.waitForLoad();
        //await expect(productsPage.searchedProductsTitle).toBeVisible()
        await productsPage.searchProduct(searchTerm);
        await productsPage.expectUrl(`${URLs.home}products?search=${searchTerm}`)
        await productsPage.expectSearchedProductsAreVisible(data.products.searchProduct);
    });

    test('TC_18: View Category Products', async () => {
        const { dress, jeans } = data.products.subcategories;

        await homePage.expectCategoriesToBeVisible();
        await homePage.clickOnDressSubcategory();
        await productsPage.expectUrl(`${URLs.home}category_products/${dress.categoryId}`)
        await expect(productsPage.subTitle).toHaveText(dress.title);


        await productsPage.clickHome();
        await homePage.clickOnJeansSubcategory();
        await productsPage.expectUrl(`${URLs.home}category_products/${jeans.categoryId}`)
        await expect(productsPage.subTitle).toHaveText(jeans.title);

    });

    test('TC_19: View & Cart Brand Products', async () => {
        const { polo, biba } = data.products.brands;

        await homePage.clickProducts();
        await productsPage.waitForLoad();
        //await expect(productsPage.allProductsTitle).toBeVisible();
        await productsPage.expectBrandsToBeVisible();
        const itemsBrandOne = await productsPage.filterByBrand(polo.name);
        await productsPage.expectUrl(`${URLs.home}brand_products/${polo.name}`)
        await productsPage.expectBrandProductsAreDisplayed(polo.title, itemsBrandOne!)

        const itemsBrandTwo = await productsPage.filterByBrand(biba.name);
        await productsPage.expectUrl(`${URLs.home}brand_products/${biba.name}`)
        await productsPage.expectBrandProductsAreDisplayed(biba.title, itemsBrandTwo!);

    });

    test('TC_21: Add review on product', async ({ }) => {
        const { name, email, message } = data.reviewInfo;

        await homePage.clickProducts();
        //await expect(productsPage.allProductsTitle).toBeVisible();
        await productsPage.viewFirstProduct();
        await expect(productsDetailsPage.writeReviewTitle).toBeVisible();
        await productsDetailsPage.writeReview(name, email, message);
        await expect(productsDetailsPage.reviewSentMessage).toBeVisible();

    });

});