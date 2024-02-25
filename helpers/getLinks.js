const puppeteer = require('puppeteer');

/**
 * Получение всех ссылок на странице, начинаюшихся на siteStartPage.
 * @param {string} sitePage Текущяя страница для сбора ссылок.
 * @param {string} startPage Главная страница входа на сайт.
 * @return {string[] | null}
 */
async function getLinks(sitePage, startPage) {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(sitePage);

    const links = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('a'), (e) => e.href);
    });

    if(Array.isArray(links) && links.length > 0) {
        const rightLinks = links.filter(link => link.includes(startPage, 0));

        await browser.close();

        return rightLinks;
    } else {

        await browser.close();

        return null;
    }

}

module.exports = getLinks;