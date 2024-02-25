const fs = require('fs');
const chalk = require('chalk');
//= helpers
const getLinks = require('./helpers/getLinks');
const getCleanHtml = require('./helpers/getCleanHtml');

//= main const
const siteStartPage = 'https://kebikov.com/';
const mainArrayLinks = [];

/**
 * Основное тело работы праграммы.
 */
async function run() {

    //* Получение html
    const htmlClean = await getCleanHtml(siteStartPage);

    if(!fs.existsSync('./dist')) {
        fs.mkdirSync('./dist');
    } 

    fs.writeFileSync('./dist/index.html', htmlClean);
    mainArrayLinks.push(siteStartPage);

    const listLinks = await getLinks(siteStartPage, siteStartPage);

    console.log(listLinks);

    if(listLinks) {
        for(const link of listLinks) {
            try{
                // Есть ли ссылка в массиве ссылок.
                if(!mainArrayLinks.includes(link)) {

                    /**
                     * Путь к странице без стартовой страницы.
                     * @type {string} 
                     * @example 'https://kebikov.com/weddings-all/MY - https://kebikov.com/ = weddings-all/MY'
                     * @example 'weddings-all/MY'
                     */
                    const folderPath = link.replace(siteStartPage, '');
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

                    //* Получение html
                    console.log('GET');
                    let htmlCode = await getCleanHtml(link);
                    console.log('Отработал.');
                    console.log(htmlCode);
                    if(fs.existsSync(wholePath)) {
                        fs.writeFileSync(wholePath + '/index.html', htmlCode);
                        console.log(chalk.bgBlue('Write file : ', link));
                        mainArrayLinks.push(link);
                    } else {
                        console.log('Path not found.');
                    }
                }
            } catch(error) {
                console.log('Error :', error);
            }
        };
    }

    console.log(chalk.green.inverse(' FINISH '));
}

run();
