const puppeteer = require('puppeteer');

/**
 * Получение всех ссылок на странице, начинаюшихся на siteStartPage.
 * @param {puppeteer.Page} page Обьект страницы.
 * @param {string} sitePage Текущяя страница для сбора ссылок.
 * @param {string} startPage Главная страница входа на сайт.
 * @return {string[] | null}
 */
async function getLinks(page, sitePage, startPage) {
    
    await page.goto(sitePage);
    await page.waitForSelector("body", { visible: true });

    const links = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('a'), (e) => e.href);
    });

    if(Array.isArray(links) && links.length > 0) {
        const rightLinks = links.filter(link => link.includes(startPage, 0));

        return rightLinks;
    } else {
        return null;
    }

}

module.exports = getLinks;