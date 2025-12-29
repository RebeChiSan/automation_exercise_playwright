import { Page, expect, Locator } from '@playwright/test';

export class BasePage {
    protected page: Page;
    readonly logOutLink: Locator;
    readonly deleteAccountLink: Locator;
    readonly contactUsLink: Locator;
    readonly homeLink: Locator;
    readonly cartLink: Locator;
    readonly testsLink: Locator;
    readonly productsLink: Locator;
    readonly loginLink: Locator;
    readonly scrollUpIcon: Locator;
    readonly subscriptionTitle: Locator
    readonly emailSubscriptionInput: Locator
    readonly subscribeButton: Locator
    readonly modalContent: Locator
    readonly successSubscriptionMessage: Locator;


    constructor(page: Page) {
        this.page = page;
        this.productsLink = page.locator("//a[text()=' Products']");
        this.cartLink = page.locator("//a[text()=' Cart']");
        this.loginLink = page.locator("//a[text()=' Signup / Login']");
        this.logOutLink = page.locator("//a[text()=' Logout']");
        this.deleteAccountLink = page.locator("//a[text()=' Delete Account']");
        this.testsLink = page.locator("//a[text()=' Test Cases']");
        this.contactUsLink = page.locator("//a[text()=' Contact us']");
        this.homeLink = page.locator("//a[text()=' Home']");
        this.scrollUpIcon = page.locator("#scrollUp");
        this.subscriptionTitle = page.getByRole('heading', { name: "Subscription" });//no lo ocupo en esta pagina
        this.emailSubscriptionInput = page.getByPlaceholder("Your email address");
        this.subscribeButton = page.locator("#subscribe");
        this.modalContent = page.locator(".show");
        this.successSubscriptionMessage = page.getByText("You have been successfully subscribed!");//no lo ocupo en esta pagina

    }

    async clickHome() {
        await this.homeLink.click();
    }

    async clickSignupLogin() {
        await this.loginLink.click();
    }

    async clickProducts() {
        await this.productsLink.click();
    }

    async clickCart() {
        await this.cartLink.click();
    }

    async clickContactUs() {
        await this.contactUsLink.click();
    }

    async clickTests() {
        await this.testsLink.click();
    }

    async clickDeleteAccount() {
        await this.deleteAccountLink.click();
    }

    async clickLogout() {
        await this.logOutLink.click();
    }

    async scrollToTop() {
        await this.page.evaluate(() => window.scrollTo(0, 0));
    }

    async clickScrollUpArrow() {
        await this.scrollUpIcon.click();
    }

    async goto(url: string) {
        await this.page.goto(url, { waitUntil: 'domcontentloaded' });
    }

    async scrollDown() {
        await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    }

    async scrollToTargetElement(element: Locator) {
        await element.scrollIntoViewIfNeeded();
    }

    async subscribe(email: string) {
        await this.emailSubscriptionInput.fill(email);
        await this.subscribeButton.click();
    }

    async expectUrl(url: string) {
        await expect(this.page).toHaveURL(url);
    }

    async expectUrlToContain(text: string) {
        await expect(this.page).toHaveURL(new RegExp(text));
    }

    async waitForUrl(url: string) {
        await this.page.waitForURL(url);
    }

    async waitModalToBeVisible() {
        await this.modalContent.waitFor({ state: 'visible' });
    }

    async waitForLoad() {
        await this.page.waitForLoadState('load');
    }

}