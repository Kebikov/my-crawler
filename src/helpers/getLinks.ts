import puppeteer from 'puppeteer';
import { Page } from 'puppeteer';
import chalk from 'chalk';


/** 
 * `Получение всех уникальных ссылок на странице, начинаюшихся на siteStartPage.` 
 * @example
 * return: {Promise<string[] | null>} Массив ссылок на странице.
 */
async function getLinks(
    /** `Обьект страницы.` */
    page: Page, 
     /** `Текущяя страница для сбора ссылок.` */
    sitePage: string, 
     /** `Главная страница входа на сайт.` */
    startPage: string
) {

    console.log(chalk.bgBlackBright('🔧 ', 'is processed...', sitePage));

    await page.goto(sitePage, {waitUntil: 'networkidle2'});

    // Получение всех ссылок на странице.
    const links: string[] = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('a'), (e) => e.href);
    });

    const linksSet = new Set(links);

    if(linksSet.size > 0) {
        const rightLinks = links.filter(link => link.startsWith(startPage));
        return rightLinks;
    } else {
        return null;
    }

}


export default getLinks;
