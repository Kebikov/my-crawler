import getCleanHtml from "./getCleanHtml";
import fs from 'fs';
import { Page } from "puppeteer";
import chalk from "chalk";

/** `Запись html в папку.`  */
const writingHtmlToFolder = async (
     /** `Обьект страницы.` */
    page: Page,
     /** `Путь к созданной папке.` */
    wholePath: string,
     /** `Ссылка на страницу с которой берем html для записи.` */
    link: string
) => {
    
    let htmlCode = await getCleanHtml(page, link);
    if(fs.existsSync(wholePath)) {
        fs.writeFileSync(wholePath + '/index.html', htmlCode);
        console.log(chalk.blue('📑 Writed link : ', link));
    } else {
        console.log('Path not found.');
    }
}

export default writingHtmlToFolder;