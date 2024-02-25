const puppeteer = require('puppeteer');

/**
 * Получение только нужного html на сайте, без кода изображений в base64.
 * @param {string} url Адресс страницы для получения html.
 * @returns {string} Код html без base64.
 */
const  getCleanHtml = async (url) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const html = await page.content();
    const base64 = html.replace(/(<img src="data:image\/png;base64)(.*?)(>)/gi, '');

    await browser.close();

    return base64;
}

module.exports = getCleanHtml;