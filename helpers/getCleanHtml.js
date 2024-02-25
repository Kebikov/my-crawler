const { minify } = require('html-minifier-terser');

/**
 * Получение только нужного html на сайте, без кода изображений в base64.
 *  @param {Object} page Обьект страницы.
 * @param {string} url Адресс страницы для получения html.
 * @returns {string} Код html без base64.
 */
const  getCleanHtml = async (page, url) => {

    await page.goto(url);

    const html = await page.content();
    const base64 = html.replace(/(<img src="data:image\/png;base64)(.*?)(>)/gi, '');

    const result = await minify(base64, {
        collapseWhitespace: true,
        removeComments: true,
        minifyCSS: true,
        minifyJS: true
    });

    return result;
}

module.exports = getCleanHtml;