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
        //this.checkoutButton = page.getByRole("link", { name: "Proceed To Checkout" });
        this.checkoutButton = page.locator("//a[text()='Proceed To Checkout']");
        this.registerLoginLink = page.getByRole("link", { name: "Register / Login" });
        //this.deleteButtonList = page.locator("//a[@class='cart_quantity_delete']")
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
        console.log(`Iniciando borrado de ${numToDelete} productos...`);
        for (let i = 0; i < numToDelete; i++) {
            // 1. Obtenemos cuántos hay ANTES de borrar
            const countBefore = await this.deleteButtonList.count();

            // 2. Hacemos click en el primero
            // Usamos .first() para que siempre intente borrar el que está arriba
            await this.deleteButtonList.first().click();

            // 3. ESPERA CRÍTICA: Esperar a que el número de elementos disminuya
            // Esto es mucho más fiable que 'detached' en listas dinámicas
            await expect(this.deleteButtonList).toHaveCount(countBefore - 1);
            console.log(`Eliminado producto ${i + 1}. Quedan: ${countBefore - 1}`);
        }
    }




    async expectProductsToBeVisibleInCart(searchedProductNumber: number) {
        const cartProductCount = await this.productDescriptionList.count();
        await expect(this.productDescriptionList).toHaveCount(searchedProductNumber)
        for (let i = 0; i < cartProductCount; i++) {
            const product = this.productDescriptionList.nth(i);
            await expect(product).toBeVisible();
        }
        if (process.env.DEBUG) {
            console.log(`${searchedProductNumber} products are visible in the cart`);
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