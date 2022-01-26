const timeout = 15000;

// Test des fonctionnalités de prise de commande
describe("Checkout process", () => {
    let page;

    test('checkout', async () => {
        await page.goto(process.env.TESTED_WEBSITE);
        await page.waitForSelector('#user-name');
        await page.type('#user-name', process.env.TEST_LOGIN);
        await page.waitForSelector('#password');
        await page.type('#password', process.env.TEST_PASSWORD);
        await page.waitForSelector('#login-button');
        await page.click('#login-button');
        await page.waitForSelector('#add-to-cart-sauce-labs-backpack');
        await page.click('#add-to-cart-sauce-labs-backpack');
        await page.click('.shopping_cart_link');
        await page.waitForSelector('.cart_list');
        await page.click('.checkout_button');

        // à compléter
        const html3 = await page.$eval('body', e => e.innerHTML);
        expect(html3).toContain("Checkout: Your Information");
        await page.waitForSelector('.checkout_info_container');

        await page.type('#first-name', process.env.TEST_LOGIN);
        await page.type('#last-name', process.env.TEST_LOGIN);
        await page.type('#postal-code', process.env.TEST_LOGIN);
        await page.click('#continue');

        const html = await page.$eval('body', e => e.innerHTML);
        expect(html).toContain("Payment Information:");
        await page.waitForSelector('.summary_info');
        await page.click('#finish');

        const html2 = await page.$eval('body', e => e.innerHTML);
        expect(html2).toContain("THANK YOU FOR YOUR ORDER");
        await page.waitForSelector('#checkout_complete_container');
        await page.click('#back-to-products');

        const html4 = await page.$eval('body', e => e.innerHTML);
        expect(html4).toContain("carry.allTheThings() with the sleek");

    }, timeout);


    // cette fonction est lancée avant chaque test de cette
    // série de tests
    beforeAll(async () => {
        // ouvrir un onglet dans le navigateur
        page = await global.__BROWSER__.newPage()
    }, timeout)

});
