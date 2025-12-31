import { Locator, Page, expect } from "@playwright/test"
import { BasePage } from "./BasePage";

export class CheckoutPage extends BasePage {
    readonly placeOrderButton: Locator
    readonly commentInput: Locator
    readonly fullName: Locator
    readonly company: Locator
    readonly address1: Locator
    readonly address2: Locator
    readonly city: Locator
    readonly country: Locator
    readonly phone: Locator
    readonly productDescription: Locator
    readonly fullNameInvoice: Locator
    readonly companyInvoice: Locator
    readonly address1Invoice: Locator
    readonly address2Invoice: Locator
    readonly cityInvoice: Locator
    readonly countryInvoice: Locator
    readonly phoneInvoice: Locator

    constructor(page: Page) {
        super(page)
        this.fullName = page.locator("ul[id='address_delivery'] li:nth-child(2)");
        this.company = page.locator("ul[id='address_delivery'] li:nth-child(3)");
        this.address1 = page.locator("ul[id='address_delivery'] li:nth-child(4)");
        this.address2 = page.locator("ul[id='address_delivery'] li:nth-child(5)");
        this.city = page.locator("ul[id='address_delivery'] li:nth-child(6)");
        this.country = page.locator("ul[id='address_delivery'] li:nth-child(7)");
        this.phone = page.locator("ul[id='address_delivery'] li:nth-child(8)");
        this.commentInput = page.locator("textarea[name='message']");
        this.placeOrderButton = page.getByText("Place Order");
        this.productDescription = page.locator("//td[@class='cart_description']/h4");
        this.fullNameInvoice = page.locator("ul[id='address_invoice'] li:nth-child(2)");
        this.companyInvoice = page.locator("ul[id='address_invoice'] li:nth-child(3)");
        this.address1Invoice = page.locator("ul[id='address_invoice'] li:nth-child(4)");
        this.address2Invoice = page.locator("ul[id='address_invoice'] li:nth-child(5)");
        this.cityInvoice = page.locator("ul[id='address_invoice'] li:nth-child(6)");
        this.countryInvoice = page.locator("ul[id='address_invoice'] li:nth-child(7)");
        this.phoneInvoice = page.locator("ul[id='address_invoice'] li:nth-child(8)");
    }

    async verifyDeliveryAddressDetails(user: any) {
        await expect(this.fullName).toHaveText(user.fullName);
        await expect(this.company).toHaveText(user.companyName);
        await expect(this.address1).toHaveText(user.address1);
        await expect(this.address2).toHaveText(user.address2);
        await expect(this.city).toHaveText(user.fullAddress);
        await expect(this.country).toHaveText(user.country);
        await expect(this.phone).toHaveText(user.phoneNumber);
    }

    async verifyBillingAddressDetails(user: any) {
        await expect(this.fullNameInvoice).toHaveText(user.fullName);
        await expect(this.companyInvoice).toHaveText(user.companyName);
        await expect(this.address1Invoice).toHaveText(user.address1);
        await expect(this.address2Invoice).toHaveText(user.address2);
        await expect(this.cityInvoice).toHaveText(user.fullAddress);
        await expect(this.countryInvoice).toHaveText(user.country);
        await expect(this.phoneInvoice).toHaveText(user.phoneNumber);
    }

    async fillComment(mesagge: string) {
        await this.commentInput.fill(mesagge);
    }

    async clickOnPlaceOrder() {
        await this.placeOrderButton.click();
    }
}