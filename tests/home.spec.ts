import { test, expect } from "../fixtures/baseTest";
import data from "../utils/test-data/data.json";

test.describe('Home Page functionalities', () => {

    test.beforeEach(async ({ homePage }) => {
        await homePage.goto("/");
        await expect(homePage.homeTitle.first()).toBeVisible({ timeout: 10000 });
    });

    test('TC_10: Verify Subscription in home page', async ({ homePage }) => {
        await homePage.scrollDown();
        await expect(homePage.subscriptionTitle).toBeVisible();
        await homePage.subscribe(data.subscribeEmail);
        await expect(homePage.successSubscriptionMessage).toBeVisible();
    });

    test('TC_25: Verify Scroll Up using "Arrow" button and Scroll Down functionality', async ({ homePage }) => {
        await homePage.scrollDown();
        await expect(homePage.subscriptionTitle).toBeVisible();
        await homePage.clickScrollUpArrow();
        await expect(homePage.homeLogo).toBeInViewport();
    });

    test('TC_26: Verify Scroll Up without "Arrow" button and Scroll Down functionality', async ({ homePage }) => {
        await homePage.scrollDown();
        await expect(homePage.subscriptionTitle).toBeVisible();
        await homePage.scrollToTop();
        await expect(homePage.homeLogo).toBeInViewport();
    });

});