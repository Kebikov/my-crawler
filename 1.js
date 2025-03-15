//const axios = require("axios");
const fs = require("fs");

async function downloadPage(url) {
  try {
    const response = await fetch(url);

    const text = await response.text();

    fs.writeFileSync("check.html", text);
    console.log("Страница сохранена как page.html");
  } catch (error) {
    console.error("Ошибка:", error);
  }
}

downloadPage("https://kebikov.com");
