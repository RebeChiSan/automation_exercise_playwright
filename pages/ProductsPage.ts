import { Locator, Page, expect } from "@playwright/test"
import { BasePage } from "./BasePage";

export class ProductsPage extends BasePage {
    readonly allProductsTitle: Locator
    readonly allProductsList: Locator
    readonly viewProductBtnList: Locator
    readonly searchInput: Locator
    readonly searchButton: Locator
    readonly searchedProductsTitle: Locator
    readonly searchedImagesList: Locator
    readonly viewCartLink: Locator
    readonly continueButton: Locator
    readonly subTitle: Locator
    readonly brandsList: Locator
    readonly addToCartLinks: Locator
    readonly cartLink: Locator
    readonly productNameList: Locator
    readonly modalContent: Locator
    readonly brandLink: Locator


    constructor(page: Page) {
        super(page)
        this.allProductsTitle = page.getByText("All Products")
        this.allProductsList = page.locator(".product-image-wrapper");
        this.productNameList = page.locator(".productinfo p")
        this.viewProductBtnList = page.locator("//a[contains(text(),'View Product')]")
        this.searchInput = page.getByPlaceholder("Search Product");
        this.searchButton = page.locator("#submit_search");
        this.searchedProductsTitle = page.getByText("Searched Products");
        this.searchedImagesList = page.getByAltText("ecommerce website products");
        this.addToCartLinks = page.locator("//div[@class ='overlay-content']/a[contains(text(),'Add to cart')]")
        this.viewCartLink = page.getByText("View Cart");
        this.continueButton = page.getByRole('button', { name: "Continue Shopping" });
        this.subTitle = page.locator("h2[class='title text-center']");
        this.brandsList = page.locator("//a[contains(@href, 'brand_products')]");
        this.cartLink = page.locator("//a[text()=' Cart']");
        this.modalContent = page.locator(".modal-content");
        this.brandLink = page.locator('.brands-name a');
    }

    async expectProductsListToBeVisible() {

        await expect(this.allProductsList).not.toHaveCount(0);
        for (const product of await this.allProductsList.all()) {
            await expect(product).toBeVisible();
        }
    }

    async viewFirstProduct() {
        await this.viewProductBtnList.first().click();
    }

    async clickViewCartLink() {
        await this.viewCartLink.click();
    }

    async clickContinueButton() {
        await this.continueButton.click();
    }

    async addProductsToCart(numberOfProducts: number) {
        for (let i = 0; i < numberOfProducts; i++) {
            const productCard = this.allProductsList.nth(i);
            const overlayCard = productCard.locator('.product-overlay');
            const addToCartBtn = overlayCard.locator('.add-to-cart');
            await expect(productCard).toBeVisible();
            await productCard.hover();
            await addToCartBtn.click();
            await this.page.locator("#cartModal").waitFor();;
            if (i < numberOfProducts - 1) {
                const button = this.page.locator(".close-modal")
                button.click();
                await this.page.locator("#cartModal").waitFor({ state: 'hidden' });
            }
        }
    }

    async searchProduct(product: string) {
        await this.page.locator('.product-image-wrapper').first().waitFor();
        await this.searchInput.fill(product);
        await this.searchButton.click();
    }

    async expectSearchedProductsAreVisible(item: string): Promise<number> {
        const searchProductCount = await this.productNameList.count();
        await expect(this.productNameList).not.toHaveCount(0);
        for (let i = 0; i < searchProductCount; i++) {
            const product = this.productNameList.nth(i);
            await expect(this.productNameList.nth(i))
                .toContainText(item, { ignoreCase: true });
        }
        return searchProductCount;
    }

    async expectBrandsToBeVisible() {
        const brandListCount = await this.brandsList.count();
        await expect(this.brandsList).toHaveCount(8)
        for (let i = 0; i < brandListCount; i++) {
            const brand = this.brandsList.nth(i);
            await expect(brand).toBeVisible();
            const brandText = await brand.innerText();
        }
    }

    async expectBrandProductsAreDisplayed(brand: string, items: string) {
        await expect(this.subTitle).toHaveText(brand);
        await expect(this.allProductsList).toHaveCount(+items);
    }

    async filterByBrand(brand: string) {
        const itemsByBrand = await this.brandLink.filter({ hasText: brand.toUpperCase() }).locator("span").textContent();
        await this.brandLink.filter({ hasText: brand.toUpperCase() }).click()
        return itemsByBrand?.replace(/\D/g, "");
    }

}


