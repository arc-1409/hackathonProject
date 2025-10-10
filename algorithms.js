import puppeteer from "puppeteer";

/*
TODO
- optional parameter
*/

async function searchStanding(page, obj) {

    if("team" in obj) {
        console.error("ERROR: undefined teamName");
    }

    // filter leagues
    if(obj.league === "Premier League") {
        await page.goto("https://www.bbc.com/sport/football/premier-league/table", { waitUntil: "networkidle2"});
    } else if (obj.league === "La Liga") {
        await page.goto("https://www.bbc.com/sport/football/spanish-la-liga/table", { waitUntil: "networkidle2"});
    } else if (obj.league === "German Bundesliga") {
        await page.goto("https://www.bbc.com/sport/football/german-bundesliga/table", { waitUntil: "networkidle2"});
    } else {  // for when league isn't specified
        await page.goto("https://www.bbc.com/sport/football/premier-league/table", { waitUntil: "networkidle2"});
        await page.goto("https://www.bbc.com/sport/football/spanish-la-liga/table", { waitUntil: "networkidle2"});
        await page.goto("https://www.bbc.com/sport/football/german-bundesliga/table", { waitUntil: "networkidle2"});
    }

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

    const targetTeam = teamsList.find(t => t.name?.toLowerCase() === obj.team.toLowerCase());

    if(targetTeam) {
        console.log(`${obj.team} is currently in position ${team.rank} on ${obj.league}.`);
    } 
    else {
        console.log(`${obj.team} is not on ${obj.league}.`);
    } // no need to close page; index.js does it already
}

export {searchStanding};