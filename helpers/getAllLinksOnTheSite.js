const chalk = require('chalk');
const puppeteer = require('puppeteer');
const getLinks = require('./getLinks');

/**
 * Получение всех уникальных страниц на сайте.
 * @param {puppeteer.Page} page Обьект страницы.
 * @param {string} pageMainOfTheSite Главная страница сайта.
 * @returns {string[]} Массив унакальных ссылок на сайте.
 */
const getAllLinksOnTheSite = async (page, pageMainOfTheSite) => {
    try {
        /**
         * Массив уникальных страниц сайта.
         * @type {string[]}
         */
        const mainArrayLinks = [];

        /**
         * Массив всех полученых ссылок.
         * @type {string[]}
         */
        let timeArrayLinks = [];

        const listLinks = await getLinks(page, pageMainOfTheSite, pageMainOfTheSite);
        timeArrayLinks = listLinks;

        for(const link of timeArrayLinks) {
            if(mainArrayLinks.includes(link)) continue;
            mainArrayLinks.push(link);

            const  gotListLinks = await getLinks(page, link, pageMainOfTheSite);

            // Проверка ссылок, были ли уже ранее добавлены.
            for(const gotLink of gotListLinks) {
                if(timeArrayLinks.includes(gotLink) || mainArrayLinks.includes(gotLink)) {
                    continue;
                } else {
                    console.log(chalk.bgCyan('Got link : ', gotLink));
                    timeArrayLinks.push(gotLink);
                }
            }
        }

        // Удаление стартовой страницы из массива.
        const index = mainArrayLinks.indexOf(pageMainOfTheSite);
        if(index !== -1) mainArrayLinks.splice(index, 1);

        return mainArrayLinks;

    }catch (error) {
        console.error(chalk.bgRed('Error in Function getAllLinksOnTheSite() >>> ', error));
    }
}

module.exports = getAllLinksOnTheSite;