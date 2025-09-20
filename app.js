const puppeteer = require("puppeteer");

async function webScrapPrem() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto("https://www.bbc.com/sport/football/premier-league/table");
}