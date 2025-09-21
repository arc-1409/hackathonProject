const puppeteer = require("puppeteer");

async function getPositionPrem(page, teamName) {
    await page.goto("https://www.bbc.com/sport/football/premier-league/table", { waitUntil: "networkidle2"});
    await page.waitForSelector("table tbody tr");

    const teamsList = await page.$$eval("table tbody tr", rows => {
        return rows.map(row => {
            const position = row.querySelector("td:first-child")?.textContent.trim();
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

    await page.close();
}

async function getPositionLaLiga(page, teamName) {
    await page.goto("https://www.bbc.com/sport/football/spanish-la-liga/table", { waitUntil: "networkidle2"});
    await page.waitForSelector("table tbody tr");

    const teamsList = await page.$$eval("table tbody tr", rows => {
        return rows.map(row => {
            const position = row.querySelector("td:first-child")?.textContent.trim();
            const name = row.querySelector("td.team")?.textContent.trim();
            return { position, name };
        });
    });

    const team = teamsList.find(t => t.name?.toLowerCase() === teamName.toLowerCase());

    if(team) {
        console.log(`${team.name} is currently in position ${team.position} in la liga.`); } 
    else {
        console.log(`${team.name} is not in la liga.`); } 

    await page.close();
}

export { getPositionPrem, getPositionLaLiga };
