import { Locator, Page, expect } from "@playwright/test"
import { BasePage } from "./BasePage";

export class ViewCartPage extends BasePage {
    readonly cartTable: Locator
    readonly quantityText: Locator
    readonly productRows: Locator
    readonly checkoutButton: Locator
    readonly registerLoginLink: Locator
    readonly deleteButtonList: Locator
    readonly productDescriptionList: Locator
    readonly homeLink: Locator
    readonly cartLink: Locator
    readonly productDescriptionTextList: Locator

    constructor(page: Page) {
        super(page)
        this.cartTable = page.locator("#cart_info_table");
        this.productRows = this.cartTable.locator('tr[id*="product-"]');
        this.quantityText = page.locator("button[class='disabled']");
        this.checkoutButton = page.locator("//a[text()='Proceed To Checkout']");
        this.registerLoginLink = page.getByRole("link", { name: "Register / Login" });
        this.deleteButtonList = page.locator(".cart_quantity_delete");
        this.productDescriptionTextList = page.locator("//td[@class='cart_description']/h4");
        this.productDescriptionList = page.locator("//td[@class='cart_description']");
        this.homeLink = page.locator("//a[text()=' Home']");
        this.cartLink = page.locator("//a[text()=' Cart']");

    }

    async clickOnCheckout() {
        await this.checkoutButton.waitFor();
        await this.checkoutButton.click();
    }

    async clickOnRegisterLogin() {
        await this.page.locator("#checkoutModal").waitFor();
        await this.page.locator("#checkoutModal").getByRole("link", { name: "Register / Login" }).click();
    }

    async verifyProductRemoval(add: number, remove: number) {
        await expect(this.productDescriptionList).toHaveCount(add - remove);
    }

    async deleteProducts(items?: number) {
        const totalAvailable = await this.deleteButtonList.count();
        const numToDelete = items ?? totalAvailable;
        for (let i = 0; i < numToDelete; i++) {
            const countBefore = await this.deleteButtonList.count();
            await this.deleteButtonList.first().click();
            await expect(this.deleteButtonList).toHaveCount(countBefore - 1);
        }
    }

    async expectProductsToBeVisibleInCart(searchedProductNumber: number) {
        const cartProductCount = await this.productDescriptionList.count();
        await expect(this.productDescriptionList).toHaveCount(searchedProductNumber)
        for (let i = 0; i < cartProductCount; i++) {
            const product = this.productDescriptionList.nth(i);
            await expect(product).toBeVisible();
        }
    }

    async verifyProductDetails(items: number) {
        for (let i = 0; i < items; i++) {
            const productRow = this.productRows.nth(i)
            await expect(productRow.locator('.cart_description')).toBeVisible()
            await expect(productRow.locator('.cart_price')).toBeVisible()
            await expect(productRow.locator('.cart_quantity')).toBeVisible()
            await expect(productRow.locator('.cart_total')).toBeVisible()
        }
    }
}