const puppeteer = require('puppeteer');
const fs = require('fs');

async function run() {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://kebikov.com/');

    //* Получение html
    const html = await page.content();

    const base64 = html.replace(/(<img src="data:image\/png;base64)(.*?)(>)/gi, '');
    console.log(base64);

    if(fs.existsSync('./dist')) {
        fs.mkdirSync('./dist');
    }

    
    fs.writeFileSync('./dist/index.html', base64);

    //* Получение ссылок
    // const links = await page.evaluate(() => {
    //     return Array.from(document.querySelectorAll('a'), (e) => e.href);
    // });
    // console.log(links);

    await browser.close();

}

run();
