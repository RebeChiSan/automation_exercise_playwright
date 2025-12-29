
import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class AccountCreatedPage extends BasePage {
    readonly continueButton: Locator;
    readonly accountCreatedTitle: Locator;

    constructor(page: Page) {
        super(page)
        this.continueButton = page.getByRole("link", { name: "Continue" });
        this.accountCreatedTitle = page.getByRole("heading", { name: "ACCOUNT CREATED!", level: 2 });
    }

    async clickContinue() {
        await this.continueButton.click();
    }

    async expectAccountCreatedVisible() {
        await expect(this.accountCreatedTitle).toBeVisible();
    }
}