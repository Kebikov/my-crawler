import fs from 'fs';

/** `Создание папки для дальнейшей записи в нее html.`  
 * @example
 * return: {string} Путь к созданной папке.
 */
const createFolder = (
    cutPath: string[]
) => {

    // Создание нужных папок.
    let wholePath = './dist/' + cutPath[0];

    cutPath.forEach((item, i) => {
        if(i !== 0) wholePath = wholePath + '/' + item;
        if(!fs.existsSync(wholePath)) {
            fs.mkdirSync(wholePath);
        }
    });

    return wholePath;
}

export default createFolder;