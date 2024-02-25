# Работа с npm Puppeteer

Puppeteer - это библиотека Node.js, разработанная для управления и автоматизации браузера Chrome или Chromium с использованием протокола DevTools. Она предоставляет удобный интерфейс для выполнения различных задач, таких как создание снимков экрана, генерация PDF, управление формами, выполнение скриптов на странице, навигация по сайту и многое другое.

Например, с использованием Puppeteer, вы можете написать скрипт, который открывает веб-страницу, заполняет форму, выполняет навигацию по сайту, делает снимки экрана и многое другое. Он часто используется для тестирования веб-приложений, веб-скрапинга, автоматизации задач и других сценариев, требующих взаимодействия с браузером.

## Видео пример работы с Puppeteer

https://www.youtube.com/watch?v=S67gyqnYHmI

## Экзампляр для начала работы

```
const puppeteer = require('puppeteer');

async function run() {

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://kebikov.com/');

    //* Скриншот сайта
    //await page.screenshot({path: 'example.png', fullPage: true});
    
    //* Получение html
    // const html = await page.content();
    // console.log(html);

    //* Дождаться появления селектора, в данном случае ждем body
    await page.waitForSelector("body", { visible: true });

    //* Получение ссылок
    const links = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('a'), (e) => e.href);
    });

    console.log(links);

    await browser.close();

}

run();
```
