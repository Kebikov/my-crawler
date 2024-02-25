const getCleanHtml = require('./getCleanHtml');
const puppeteer = require('puppeteer');
const fs = require('fs');
const chalk = require('chalk');

/**
 * Создание необходимых файлов и папок.
 * @param {puppeteer.Page} page Обьект страницы.
 * @param {string[]} listLinks Массив всех ссылок на сайте.
 * @param {string} pageMainOfTheSite Главная страница сайта.
 * @returns {string} 
 */
const writingCode = async (page, listLinks, pageMainOfTheSite) => {
    try {
        // Html главной страницы.
        const cleanHtml = await getCleanHtml(page, pageMainOfTheSite);
        
        // Есть ли папка.
        if(!fs.existsSync('./dist')) fs.mkdirSync('./dist');
        fs.writeFileSync('./dist/index.html', cleanHtml);

        // Запись остальных страниц.
        if(Array.isArray(listLinks) && listLinks.length > 0) {
            for(const link of listLinks) {
                /**
                 * Путь к странице без стартовой страницы.
                 * @type {string} 
                 * @example 'https://kebikov.com/weddings-all/MY - https://kebikov.com/ = weddings-all/MY'
                 * @example 'weddings-all/MY'
                 */
                const folderPath = link.replace(pageMainOfTheSite, '');
                /**
                 * @type { Array[string] } Массив пути.
                 * @example [ 'weddings-all', 'MY' ]
                 */
                const cutPath = folderPath.split('/');
                // Создание нужных папок.
                let wholePath = './dist/' + cutPath[0];
                cutPath.forEach((path, i) => {
                    if(i !== 0) wholePath = wholePath + '/' + path;
                    if(!fs.existsSync(wholePath)) {
                        fs.mkdirSync(wholePath);
                    }
                })
                // Запись кода в файл.
                let htmlCode = await getCleanHtml(page, link);
                if(fs.existsSync(wholePath)) {
                    fs.writeFileSync(wholePath + '/index.html', htmlCode);
                    console.log(chalk.blue('✅ Writed link : ', link));
                } else {
                    console.log('Path not found.');
                }
            };
        }

        return 'OK';
    }catch (error) {
        console.error('Error in Function writingCode() >>> ', error);
    }
}

module.exports = writingCode;