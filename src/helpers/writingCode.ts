import getCleanHtml from './getCleanHtml';
import puppeteer from 'puppeteer';
import fs from 'fs';
import chalk from 'chalk';
import { Page } from 'puppeteer';
import createFolder from './createFolder';
import writingHtmlToFolder from './writingHtmlToFolder';

/**
 * Создание необходимых файлов и папок.
 * @example
 * return: {Promise<"OK" | undefined>} Вернет "OK" в случае успешной записи данных.
 */
const writingCode = async (
     /** `Обьект страницы.` */
    page: Page, 
     /** `Массив всех ссылок на сайте.` */
    listLinks: Set<string>, 
     /** `Главная страница сайта.` */
    pageMainOfTheSite: string
) => {
    try {

         /** `Html главной страницы.` */
        const cleanHtml = await getCleanHtml(page, pageMainOfTheSite);
        
        // Есть ли папка.
        if(!fs.existsSync('./dist')) fs.mkdirSync('./dist');
        fs.writeFileSync('./dist/index.html', cleanHtml);

        // Запись остальных страниц.
        for(const link of listLinks) {
            /**
             * Путь к странице без стартовой страницы.
             * @example 'https://kebikov.com/weddings-all/MY - https://kebikov.com/ = weddings-all/MY'
             * return: 'weddings-all/MY'
             */
            const folderPath: string = link.replace(pageMainOfTheSite, '');

            /**
             * `Массив путей.`
             * @example 
             * return: [ 'weddings-all', 'MY' ]
             */
            const cutPath: string[] = folderPath.split('/');

             /** `Путь к созданной папке.` */
            const wholePath = createFolder(cutPath);

            await writingHtmlToFolder(page, wholePath, link);
        };

        return 'OK';
    }catch (error) {
        console.error('Error in Function writingCode() >>> ', error);
    }
}

export default writingCode;




