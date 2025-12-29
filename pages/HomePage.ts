import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class HomePage extends BasePage {
    readonly homeTitle: Locator;
    readonly categoryList: Locator;
    readonly womenSubCategoriesList: Locator;
    readonly menSubCategoriesList: Locator;
    readonly viewProductBtnList: Locator;
    readonly addToCartBtnList: Locator;
    readonly addCartButton: Locator;
    readonly recommendedProductNamesList: Locator;
    readonly kidsSubCategoriesList: Locator;
    readonly recommendedItemsTitle: Locator;
    readonly viewCartLink: Locator
    readonly homeLogo: Locator

    constructor(page: Page) {
        super(page);
        this.homeLogo = page.locator("img[alt='Website for automation practice']");
        this.homeTitle = page.locator("//h1[normalize-space()='AutomationExercise']")
        this.categoryList = page.locator("//h4[@class='panel-title']/a");
        this.womenSubCategoriesList = page.locator("//div[@id='Women']/div/ul/li/a");
        this.menSubCategoriesList = page.locator("//div[@id='Men']/div/ul/li/a");
        this.kidsSubCategoriesList = page.locator("//div[@id='Kids']/div/ul/li/a");
        this.viewProductBtnList = page.locator("//a[contains(text(),'View Product')]");
        this.addToCartBtnList = page.locator("//div[@class='carousel-inner']//a[@class='btn btn-default add-to-cart']");
        this.addCartButton = page.locator("a[data-product-id='4']").nth(2);
        this.recommendedItemsTitle = page.getByText("RECOMMENDED ITEMS");
        this.recommendedProductNamesList = page.locator('.recommended_items .item.active p');
        this.viewCartLink = page.getByText("View Cart");
    }
    async clickOnDressSubcategory() {
        await this.categoryList.first().click();
        await this.womenSubCategoriesList.first().click();
    }

    async clickOnJeansSubcategory() {
        await this.categoryList.nth(1).click();
        await this.menSubCategoriesList.nth(1).click();
    }

    async viewProduct(product: number) {
        await this.viewProductBtnList.nth(product - 1).click();
    }

    async addRecommendedItemThenViewCart(): Promise<string | null> {
        const productName = await this.recommendedProductNamesList.first().textContent();
        await this.addCartButton.click();
        await this.viewCartLink.click();
        return productName;

    }

    async expectLoginUserVisible(name: string) {
        await expect(this.page.locator(`a:has-text("Logged in as ${name}")`)).toBeVisible();
    }

    async expectCategoriesToBeVisible() {
        await expect(this.categoryList).toHaveCount(3);
        const categoryListCount = await this.categoryList.count();
        for (let i = 0; i < categoryListCount; i++) {
            const category = this.categoryList.nth(i);
            await expect(category).toBeVisible();
        }
    }
}