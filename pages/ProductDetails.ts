import { Locator, Page, expect } from "@playwright/test"
import { BasePage } from "./BasePage";

export class ProductDetailsPage extends BasePage {
    readonly quantityInput: Locator
    readonly addToCartLink: Locator
    readonly viewCartLink: Locator
    readonly productPrice: Locator
    readonly productCategory: Locator
    readonly productDetailName: Locator
    readonly productAvailability: Locator
    readonly productCondition: Locator
    readonly productBrand: Locator
    readonly writeReviewTitle: Locator
    readonly reviewSentMessage: Locator
    readonly nameInput: Locator
    readonly emailInput: Locator
    readonly reviewInput: Locator
    readonly submitBtn: Locator

    constructor(page: Page) {
        super(page)
        this.quantityInput = page.locator("#quantity");
        this.addToCartLink = page.getByText("Add to Cart");
        this.viewCartLink = page.getByRole("link", { name: "View Cart" });
        this.productDetailName = page.locator("//div[@class='product-information']/h2")
        this.productCategory = page.locator("//div[@class='product-information']").getByText('Category');
        this.productPrice = page.locator("//div[@class='product-information']/p").first();
        this.productAvailability = page.locator("//div[@class='product-information']").getByText('Availability');
        this.productCondition = page.locator("//div[@class='product-information']").getByText('condition');
        this.productBrand = page.locator("//div[@class='product-information']").getByText('Brand');
        this.writeReviewTitle = page.getByText("Write Your Review");
        this.reviewSentMessage = page.getByText("Thank you for your review.");
        this.nameInput = page.locator("#name");
        this.emailInput = page.locator("#email");
        this.reviewInput = page.locator("#review");
        this.submitBtn = page.locator("#button-review");
        this.reviewSentMessage = page.getByText("Thank you for your review.");
    }

    async clickOnAddToCart() {
        await this.addToCartLink.click();
    }

    async clickOnViewCart() {
        await this.page.locator("#cartModal").waitFor();
        await this.viewCartLink.click();
    }
    async increaseQuantityProduct(quantity: string) {
        await this.quantityInput.fill(quantity);
    }
    async writeReview(name: string, email: string, text: string) {
        await this.nameInput.fill(name)
        await this.emailInput.fill(email)
        await this.reviewInput.fill(text)
        await this.submitBtn.click()
    }

}