import puppeteer from "puppeteer";

// english premier league
async function getPositionPrem(page, teamName) {
    await page.goto("https://www.bbc.com/sport/football/premier-league/table", { waitUntil: "networkidle2"});
    await page.waitForSelector("tr[class*='CellsRow']");

    const teamsList = await page.$$eval("tr[class*='CellsRow']", rows => {
        return rows.map(row => {
            const rank = row.querySelector("span.ssrcss-4fgj5b-Rank")?.textContent.trim();

            // Try aria-hidden first, fallback to visually-hidden
            // fix 2: try visually-hidden, fallback to aria-hidden
            let name = row.querySelector("span.visually-hidden")?.innerText.trim(); 
            if (!name) {
                name = row.querySelector("span[aria-hidden='true'][data-600]")?.getAttribute("data-600")?.trim();
            }
            return { rank, name };
        });
    });

    const team = teamsList.find(t => t.name?.toLowerCase() === teamName.toLowerCase());

    if(team) {
        console.log(`${teamName} is currently in position ${team.rank} on the premier league.`);
    } 
    else {
        console.log(`${teamName} is not on Premier League.`);
    } // no need to close page; index.js does it already
}

// spanish la liga
async function getPositionLaLiga(page, teamName) {
    await page.goto("https://www.bbc.com/sport/football/spanish-la-liga/table", { waitUntil: "networkidle2"});
    await page.waitForSelector("tr[class*='CellsRow']");

    const teamsList = await page.$$eval("tr[class*='CellsRow']", rows => {
        return rows.map(row => {
            const rank = row.querySelector("span.ssrcss-4fgj5b-Rank")?.innerText.trim();

            // Try aria-hidden first, fallback to visually-hidden
            // fix 2: try visually-hidden, fallback to aria-hidden
            let name = row.querySelector("span.visually-hidden")?.innerText.trim(); 
            if (!name) {
                name = row.querySelector("span[aria-hidden='true'][data-600]")?.getAttribute("data-600")?.trim();
            }
            return { rank, name };
        });
    });

    const teamTarget = teamsList.find(t => t.name?.toLowerCase() === teamName.toLowerCase());

    if(teamTarget) {
        console.log(`${teamName} is currently in position ${teamTarget.rank} in la liga.`); } 
    else {
        console.log(`${teamName} is not in la liga.`); } 
}

// german bundesliga
async function getPositionBund(page, teamName) {
    await page.goto("https://www.bbc.com/sport/football/german-bundesliga/table", { waitUntil: "networkidle2"});
    await page.waitForSelector("tr[class*='CellsRow']");

    const teamsList = await page.$$eval("tr[class*='CellsRow']", rows => {
        return rows.map(row => {
            const rank = row.querySelector("span.ssrcss-4fgj5b-Rank")?.innerText.trim();

            // Try aria-hidden first, fallback to visually-hidden
            // fix 2: try visually-hidden, fallback to aria-hidden
            let name = row.querySelector("span.visually-hidden")?.innerText.trim(); 
            if (!name) {
                name = row.querySelector("span[aria-hidden='true'][data-600]")?.getAttribute("data-600")?.trim();
            }
            return { rank, name };
        });
    });

    const teamTarget = teamsList.find(t => t.name?.toLowerCase() === teamName.toLowerCase());

    if(teamTarget) {
        console.log(`${teamName} is currently in position ${teamTarget.rank} in german bundesliga.`); } 
    else {
        console.log(`${teamName} is not in german bundesliga.`); } 
}

export { getPositionPrem, getPositionLaLiga, getPositionBund };
