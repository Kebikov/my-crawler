import { minify } from 'html-minifier-terser';
import { Page } from 'puppeteer';


/**
 * `Получение только нужного html на сайте, без кода изображений в base64.`
 * @example
 * return: {Promise<string>} Код html без base64.
 */
const  getCleanHtml = async (
     /** `Обьект страницы.` */
    page: Page, 
     /** `Адресс страницы для получения html.` */
    url: string
): Promise<string> => {

    await page.goto(url, {waitUntil: 'networkidle2'});

    const html = await page.content();
    const base64 = html.replace(/<[^<]*?base64.*?>/gi, '');

    const result = await minify(base64, {
        collapseWhitespace: true,
        removeComments: true,
        minifyCSS: true,
        minifyJS: true
    });

    return result;
}


export default getCleanHtml;




