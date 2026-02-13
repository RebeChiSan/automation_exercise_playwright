import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class PaymentDonePage extends BasePage {
    readonly successOrderMessage: Locator
    readonly downloadButton: Locator

    constructor(page: Page) {
        super(page)
        this.successOrderMessage = page.getByText("Congratulations! Your order has been confirmed!");
        this.downloadButton = page.getByText("Download Invoice");
    }

    async clickOnDownloadInvoice() {
        await this.downloadButton.click();
    }
}