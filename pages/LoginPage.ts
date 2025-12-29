import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {
    readonly emailAddressInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly nameInput: Locator;
    readonly newEmailAddressInput: Locator;
    readonly signupButton: Locator;
    readonly loginHeading: Locator;
    readonly newUserSignupHeading: Locator;
    readonly incorrectPasswordMessage: Locator;
    readonly emailAlreadyExistMessage: Locator;

    constructor(page: Page) {
        super(page);
        this.emailAddressInput = page.locator("input[data-qa='login-email']");
        this.passwordInput = page.getByRole("textbox", { name: "Password" });
        this.loginButton = page.getByRole("button", { name: "Login" });
        this.nameInput = page.getByRole("textbox", { name: "Name" });
        this.newEmailAddressInput = page.locator("input[data-qa='signup-email']");
        this.signupButton = page.getByRole("button", { name: "Signup" });
        this.loginHeading = page.getByRole("heading", { name: "Login to your account" });
        this.newUserSignupHeading = page.getByRole("heading", { name: "New User Signup!" });
        this.incorrectPasswordMessage = page.getByText('Your email or password is incorrect!');
        this.emailAlreadyExistMessage = page.getByText('Email Address already exist!');
    }

    async signup(name: string, email: string) {
        await this.nameInput.fill(name);
        await this.newEmailAddressInput.fill(email);
        await this.signupButton.click();
    }

    async loginUser(email: string, password: string) {
        await this.emailAddressInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

}
