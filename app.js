const puppeteer = require("puppeteer");

async function getPositionPrem(browser, teamName) {
    const page = await browser.newPage();

    await page.goto("https://www.bbc.com/sport/football/premier-league/table", { waitUntil: "networkidle2"});
    await page.waitForSelector("table tbody tr");

    const teamsList = await page.$$eval("table tbody tr", rows => {
        return rows.map(row => {
            const position = row.querySelector("td.first-child")?.textContent.trim();
            const name = row.querySelector("td.team")?.textContent.trim();
            return { position, name };
        });
    });

    const team = teamsList.find(t => t.name?.toLowerCase() === teamName.toLowerCase());

    if(team) {
        console.log(`${team.name} is currently in position ${team.position} on the premier league.`);
    } 
    else {
        console.log(`${team.name} is not on Premier League.`);
    }
}

async function getPositionLaLiga(browser, teamName) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto("https://www.bbc.com/sport/football/spanish-la-liga/table", { waitUntil: "networkidle2"});
    await page.waitForSelector("table tbody tr");

    const teamsList = await page.$$eval("table tbody tr", rows => {
        return rows.map(row => {
            const position = row.querySelector("td.first-child")?.textContent.trim();
            const name = row.querySelector("td.team")?.textContent.trim();
            return { position, name };
        });
    });

    const team = teamsList.find(t => t.name?.toLowerCases() === teamName.toLowerCase());

    if(team) {
        console.log(`${team.name} is currently in position ${team.position} in la liga.`); } 
    else {
        console.lot(`${team.name} is not in la liga.`); } 
}
