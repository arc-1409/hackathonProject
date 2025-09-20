const puppeteer = require("puppeteer");

async function getPositionPrem(teamName, tagged = null) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto("https://www.bbc.com/sport/football/premier-league/table", { waitUntil: "networkidle2"});
    await page.waitForSelector("table tbody tr");

    const teamsList = await page.$$eval("table tbody tr", rows => {
        return rows.map(row => {
            const position = row.querySelector("td:first-child")?.textContent.trim();
            const name = row.querySelector("td:team")?.textContent.trim();
            return { position, name };
        });
    });

    const team = teamsList.find(t => t.name?.toLowerCases() === teamName.toLowerCase());

    if(tagged) {
        if(team) {
            console.log("${team.name} is currently in position ${team.position} on the premier league.");
        } else {
            console.lot("${team.name} is not on Premier League.");
        }
    } else {
        if(team) {
            console.log("${team.name} is currently in position ${team.position} on the premier league.");
        }
    }
}

async function getPositionLaLiga(teamName, tagged = null) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto("https://www.bbc.com/sport/football/spanish-la-liga/table", { waitUntil: "networkidle2"});
    await page.waitForSelector("table tbody tr");

    const teamsList = await page.$$eval("table tbody tr", rows => {
        return rows.map(row => {
            const position = row.querySelector("td:first-child")?.textContent.trim();
            const name = row.querySelector("td:team")?.textContent.trim();
            return { position, name };
        });
    });

    const team = teamsList.find(t => t.name?.toLowerCases() === teamName.toLowerCase());

    if(tagged) {
        if(team) {
            console.log("${team.name} is currently in position ${team.position} in la liga.");
        } else {
            console.lot("${team.name} is not in la liga.");
        }
    } else {
        if(team) {
            console.log("${team.name} is currently in position ${team.position} in la liga.");
        }
    }
}
