import { Locator, Page, expect } from "@playwright/test"
import { BasePage } from "./BasePage"

export class ContactUsPage extends BasePage {
    readonly name: Locator
    readonly email: Locator
    readonly subject: Locator
    readonly message: Locator
    readonly submitButton: Locator
    readonly homeButton: Locator
    readonly getInTouchTitle: Locator
    readonly successMessage: Locator
    //readonly uploadFile: Locator

    constructor(page: Page) {
        super(page)
        this.name = page.getByRole('textbox', { name: 'Name' });
        this.email = page.getByRole('textbox', { name: 'Email', exact: true });
        this.subject = page.getByRole('textbox', { name: 'Subject' });
        this.message = page.getByRole('textbox', { name: 'Your Message Here' });
        //this.uploadFile = page.locator("input[name = 'upload_file']");
        this.getInTouchTitle = page.getByRole('heading', { name: 'GET IN TOUCH', level: 2 });
        this.submitButton = page.locator("//input[@data-qa='submit-button']");
        this.homeButton = page.getByRole('link', { name: ' Home' });
        this.successMessage = page.getByText('Success! Your details have been submitted successfully.');

    }
    async fillContactForm(contactInfo: any) {
        await this.name.fill(contactInfo.name);
        await this.email.fill(contactInfo.email);
        await this.subject.fill(contactInfo.subject);
        await this.message.fill(contactInfo.message);
        try {
            const [dialog] = await Promise.all([
                this.page.waitForEvent('dialog', { timeout: 60000 }),
                this.submitButton.click(),
            ]);
            await dialog.accept();
        } catch (error) {
            console.warn('No dialog appeared:', error);
        }
    }
}