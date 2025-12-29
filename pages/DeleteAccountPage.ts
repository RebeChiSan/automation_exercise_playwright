import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class DeleteAccountPage extends BasePage {
    readonly accountDeletedTitle: Locator;

    constructor(page: Page) {
        super(page)
        this.accountDeletedTitle = page.getByRole("heading", { name: "ACCOUNT DELETED!", level: 2 });
    }
}