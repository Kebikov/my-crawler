import puppeteer from 'puppeteer';
import chalk from 'chalk';
import getAllLinksOnTheSite from './helpers/getAllLinksOnTheSite';
import writingCode from './helpers/writingCode';



/**
 * Основное тело работы праграммы.
 */
async function run(siteStartPage: string) {
    console.log(chalk.blue('✅ ', 'Start works...'));
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const allLinksOnTheSite = await getAllLinksOnTheSite(page, siteStartPage);
    console.log('result = ', allLinksOnTheSite);
    console.log(chalk.blue('✅ ', 'Links goted !'));

    if(allLinksOnTheSite && allLinksOnTheSite.size > 0) {
        const result = await writingCode(page, allLinksOnTheSite, siteStartPage);
        console.log(chalk.bgGreen('✅ FINISH ALL ', result));
    } else {
        console.log(chalk.bgGreen('❌ NOT LINKS'));
    }

    await browser.close();
}

run('https://kebikov.com/');

