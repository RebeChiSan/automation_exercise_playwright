import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class PaymentPage extends BasePage {
    readonly cardName: Locator
    readonly cardNumber: Locator
    readonly cvc: Locator
    readonly month: Locator
    readonly year: Locator
    readonly payConfirmOrderButton: Locator
    readonly successOrderMessage: Locator
    readonly downloadButton: Locator
    readonly continueButton: Locator

    constructor(page: Page) {
        super(page)
        this.cardName = page.locator("input[name='name_on_card']");
        this.cardNumber = page.locator("input[name='card_number']");
        this.cvc = page.locator("input[name='cvc']");
        this.month = page.locator("input[name='expiry_month']");
        this.year = page.locator("input[name='expiry_year']");
        this.payConfirmOrderButton = page.getByText("Pay and Confirm Order");
        this.successOrderMessage = page.getByText("Congratulations! Your order has been confirmed!");
        this.downloadButton = page.getByText("Download Invoice");
        this.continueButton = page.getByText("Continue");
    }
    async enterPaymentDetails(paymentDetails: any) {
        await this.cardName.fill(paymentDetails.cardName);
        await this.cardNumber.fill(paymentDetails.cardNumber);
        await this.cvc.fill(paymentDetails.cvc);
        await this.month.fill(paymentDetails.expirationMonth);
        await this.year.fill(paymentDetails.expirationYear);
    }

    async clickOnPay() {
        await this.payConfirmOrderButton.click();
    }

    async clickOnDownloadInvoice() {
        await this.downloadButton.click();
    }

    async clickOnContinue() {
        await this.continueButton.click();
    }

}