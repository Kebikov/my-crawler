import puppeteer from 'puppeteer';
import chalk from 'chalk';
import { Page } from "puppeteer";
import getLinks from './getLinks';

const str = 'Главная страница сайта.'

/**
 * `Получение всех уникальных страниц на сайте.`
 * @example
 * return: {Promise<Set<string> | undefined>} Массив унакальных ссылок на сайте.
 */
const getAllLinksOnTheSite = async (
     /** `Обьект страницы.` */
    page: Page,
     /** `Главная страница сайта.` */ 
    pageMainOfTheSite: string
): Promise<Set<string> | undefined> => {
    try {

         /** `Сбор начальных ссылок на главной странице.` */
        const linksOnMainPage = await getLinks(page, pageMainOfTheSite, pageMainOfTheSite);
        
         /** `Сбор уникальных ссылок на сайте.` */
        const linksCollection = new Set<string>(linksOnMainPage);

        for(const link of linksCollection) {
            const newLinks = await getLinks(page, link, pageMainOfTheSite);
            newLinks?.forEach(item => linksCollection.add(item));
        }

        return linksCollection;
    }catch (error) {
        console.error(chalk.bgRed('Error in Function getAllLinksOnTheSite() >>> ', error));
    }
}


export default getAllLinksOnTheSite;
