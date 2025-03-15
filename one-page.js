const puppeteer = require("puppeteer");
const { minify } = require('html-minifier-terser');


const  getCleanHtml = async (str) => {

    const base64 = str.replace(/<[^<]*?base64.*?>/gi, '');

    const result = await minify(base64, {
        collapseWhitespace: true,
        removeComments: true,
        minifyCSS: true,
        minifyJS: true
    });

    return result;
}


(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto("https://kebikov.com/price-packages", { waitUntil: "networkidle2" });

  const finalHtml = await page.evaluate(() => document.documentElement.outerHTML);
  const cleanHtml = await getCleanHtml(finalHtml);
  
  require("fs").writeFileSync("index.html", cleanHtml);
  
  console.log("Финальный HTML сохранен!");
  await browser.close();
})();