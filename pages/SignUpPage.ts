import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class SignUpPage extends BasePage {
    readonly gender: Locator;
    readonly passwordInput: Locator;
    readonly daysDropdown: Locator;
    readonly monthsDropdown: Locator;
    readonly yearsDropdown: Locator;
    readonly newsletterCheckbox: Locator;
    readonly offersCheckbox: Locator;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly companyInput: Locator;
    readonly address1Input: Locator;
    readonly address2Input: Locator;
    readonly countryDropdown: Locator;
    readonly stateInput: Locator;
    readonly cityInput: Locator;
    readonly zipcodeInput: Locator;
    readonly mobileNumberInput: Locator;
    readonly createAccountButton: Locator;
    readonly accountInfoTitle: Locator;

    constructor(page: Page) {
        super(page);
        this.gender = page.locator("input[id='id_gender1']");
        this.passwordInput = page.getByRole("textbox", { name: "Password" });
        this.daysDropdown = page.locator('#days');
        this.monthsDropdown = page.locator('#months');
        this.yearsDropdown = page.locator('#years');
        this.newsletterCheckbox = page.getByRole("checkbox", { name: "Sign up for our newsletter!" });
        this.offersCheckbox = page.getByRole("checkbox", { name: "Receive special offers from our partners!" });
        this.firstNameInput = page.getByRole("textbox", { name: "First name" });
        this.lastNameInput = page.getByRole("textbox", { name: "Last name" });
        this.companyInput = page.locator("#company");
        this.address1Input = page.locator("#address1");
        this.address2Input = page.locator("#address2");
        this.countryDropdown = page.locator("#country");
        this.stateInput = page.locator("#state");
        this.cityInput = page.locator("#city");
        this.zipcodeInput = page.locator("#zipcode");
        this.mobileNumberInput = page.locator("#mobile_number");
        this.createAccountButton = page.getByRole("button", { name: "Create Account" });
        this.accountInfoTitle = page.getByText('ENTER ACCOUNT INFORMATION');
    }

    async fillAccountInfo(user: any) {
        await this.gender.check();
        await this.passwordInput.fill(user.password);
        await this.daysDropdown.selectOption(user.DOB.day);
        await this.monthsDropdown.selectOption(user.DOB.month);
        await this.yearsDropdown.selectOption(user.DOB.year);
        await this.newsletterCheckbox.check();
        await this.offersCheckbox.check();
        await this.firstNameInput.fill(user.firstName);
        await this.lastNameInput.fill(user.lastName);
        await this.companyInput.fill(user.companyName);
        await this.address1Input.fill(user.address1);
        await this.address2Input.fill(user.address2);
        await this.countryDropdown.selectOption(user.country);
        await this.stateInput.fill(user.state);
        await this.cityInput.fill(user.city);
        await this.zipcodeInput.fill(user.zipCode);
        await this.mobileNumberInput.fill(user.phoneNumber);
    }

    async clickOnCreateAccount() {
        await this.createAccountButton.click();
    }
}