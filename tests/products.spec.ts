import { test, expect } from "../fixtures/baseTest";
import { URLs } from "../utils/constants";
import data from "../utils/test-data/data.json";

test.describe('Products Page Funcionalities', () => {
    test.beforeEach(async ({ homePage }) => {
        await homePage.goto("/");
        await expect(homePage.homeTitle.first()).toBeVisible();
    });

    test('TC_08: Verify All Products and product detail page', async ({ homePage, productsPage, productDetailsPage }) => {
        await homePage.clickProducts();
        await expect(productsPage.allProductsTitle).toBeVisible();
        await productsPage.expectProductsListToBeVisible();
        await productsPage.viewFirstProduct();
        await productDetailsPage.expectUrl(`${URLs.productDetails}1`)
        await expect(productDetailsPage.productDetailName).toBeVisible();
        await expect(productDetailsPage.productCategory).toBeVisible();
        await expect(productDetailsPage.productPrice).toBeVisible();
        await expect(productDetailsPage.productAvailability).toBeVisible();
        await expect(productDetailsPage.productCondition).toBeVisible();
        await expect(productDetailsPage.productBrand).toBeVisible();
    });


    test('TC_09: Search Product', async ({ homePage, productsPage }) => {
        const searchTerm = data.products.searchProduct;
        await homePage.clickProducts();
        await productsPage.waitForLoad();
        await productsPage.searchProduct(searchTerm);
        await productsPage.expectUrl(`${URLs.home}products?search=${searchTerm}`)
        await productsPage.expectSearchedProductsAreVisible(data.products.searchProduct);
    });

    test('TC_18: View Category Products', async ({ homePage, productsPage }) => {
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

    test('TC_19: View & Cart Brand Products', async ({ homePage, productsPage }) => {
        const { polo, biba } = data.products.brands;
        await homePage.clickProducts();
        await productsPage.waitForLoad();
        await productsPage.expectBrandsToBeVisible();
        const itemsBrandOne = await productsPage.filterByBrand(polo.name);
        await productsPage.expectUrl(`${URLs.home}brand_products/${polo.name}`)
        await productsPage.expectBrandProductsAreDisplayed(polo.title, itemsBrandOne!)
        const itemsBrandTwo = await productsPage.filterByBrand(biba.name);
        await productsPage.expectUrl(`${URLs.home}brand_products/${biba.name}`)
        await productsPage.expectBrandProductsAreDisplayed(biba.title, itemsBrandTwo!);

    });

    test('TC_21: Add review on product', async ({ homePage, productsPage, productDetailsPage }) => {
        const { name, email, message } = data.reviewInfo;
        await homePage.clickProducts();
        await productsPage.viewFirstProduct();
        await expect(productDetailsPage.writeReviewTitle).toBeVisible();
        await productDetailsPage.writeReview(name, email, message);
        await expect(productDetailsPage.reviewSentMessage).toBeVisible();

    });

});