import puppeteer from "puppeteer";

async function getPositionPrem(page, teamName) {
    await page.goto("https://www.bbc.com/sport/football/premier-league/table", { waitUntil: "networkidle2"});
    await page.waitForSelector("tr.ssrcss-1urqilq-CellsRow.e13j9mpy2");

    const teamsList = await page.$$eval("tr.ssrcss-1urqilq-CellsRow.e13j9mpy2", rows => {
        return rows.map(row => {
            const rank = row.querySelector("span.ssrcss-4fgj5b-Rank")?.textContent.trim();
            const name = row.querySelector("a span.visually-hidden")?.textContent.trim();
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


async function getPositionLaLiga(page, teamName) {
    await page.goto("https://www.bbc.com/sport/football/spanish-la-liga/table", { waitUntil: "networkidle2"});
    await page.waitForSelector("tr[class*='CellsRow']");

    const teamsList = await page.$$eval("tr[class*='CellsRow']", rows => {
        return rows.map(row => {
            const rank = row.querySelector("span.ssrcss-4fgj5b-Rank")?.innerText.trim();
            
            let name = row.querySelector("span[aria-hidden='true'][data-600]")?.getAttribute("data-600")?.trim();
            if (!name) {
                name = row.querySelector("span.visually-hidden")?.innerText.trim();
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

export { getPositionPrem, getPositionLaLiga };
