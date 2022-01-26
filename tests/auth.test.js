const timeout = 5000;

// Test des fonctionnalités d'authentification
describe("Auth features", () => {
    let page;

    test('login and logout', async () => {
        await page.goto(process.env.TESTED_WEBSITE);
        await page.waitForSelector('#user-name');
        await page.type('#user-name', process.env.TEST_LOGIN);
        await page.waitForSelector('#password');
        await page.type('#password', process.env.TEST_PASSWORD);

        // à compléter
        await page.waitForSelector('#login-button');
        await page.click('#login-button');

        const search = await page.$eval('.title', (el) => el.innerText)
        const search2 = await page.$eval('#react-burger-menu-btn', (el) => el.innerText)
        const search3 = await page.$eval('#logout_sidebar_link', (el) => el.innerText)

        await page.waitForSelector('#react-burger-menu-btn');
        await page.click('#react-burger-menu-btn');
        await page.waitForSelector('.bm-menu-wrap')
        await page.waitFor(1000);
        await page.click('#logout_sidebar_link');

    }, timeout);

    // cette fonction est lancée avant chaque test de cette
    // série de tests
    beforeAll(async () => {
        // ouvrir un onglet dans le navigateur
        page = await global.__BROWSER__.newPage()
    }, timeout)

});
