const puppeteer = require('puppeteer');
const chalk = require('chalk');
//= helpers
const getAllLinksOnTheSite = require('./helpers/getAllLinksOnTheSite');
const writingCode = require('./helpers/writingCode');


//= main const
const siteStartPage = 'https://kebikov.com/';

/**
 * Основное тело работы праграммы.
 */
async function run() {
    console.log(chalk.blue('✅ ', 'Start works...'));
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const allLinksOnTheSite = await getAllLinksOnTheSite(page, siteStartPage);
    console.log(allLinksOnTheSite);
    console.log(chalk.blue('✅ ', 'Links goted !'));
    //const result = await writingCode(page, allLinksOnTheSite, siteStartPage);

    
    await browser.close();
    //console.log(chalk.bgGreen('✅ FINISH ALL ', result));
}

run();
