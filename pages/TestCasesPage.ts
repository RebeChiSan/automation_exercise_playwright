import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class TestCasesPage extends BasePage {
    readonly testCasesTitle: Locator
    readonly testCaseItems: Locator

    constructor(page: Page) {
        super(page);
        this.testCasesTitle = page.getByRole('heading', { name: 'Test Cases', level: 2 });
        this.testCaseItems = page.locator("//u[contains(text(), 'Test Case')]");
    }
    //no se utiliza
    async expectTestCasesTitleVisible() {
        await expect(this.testCasesTitle).toBeVisible();
    }
    //no se utilza
    async expectTestItemsNotToBeVoid() {
        expect((await this.testCaseItems.all()).length).toBeGreaterThan(0)
    }

}