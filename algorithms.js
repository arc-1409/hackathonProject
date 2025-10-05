import puppeteer from "puppeteer";

async function searchStanding(page, teamName) {
    if(!teamName) {
        console.error("ERROR: undefined teamName");
    }

    // filter leagues
    if(leagueName === "Premier League") {
        await page.goto("https://www.bbc.com/sport/football/premier-league/table", { waitUntil: "networkidle2"});
    } else if (leagueName === "La Liga") {
        await page.goto("https://www.bbc.com/sport/football/spanish-la-liga/table", { waitUntil: "networkidle2"});
    } else if (leaguename === "German Bundesliga") {
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

    const team = teamsList.find(t => t.name?.toLowerCase() === teamName.toLowerCase());

    if(team) {
        console.log(`${teamName} is currently in position ${team.rank} on ${leagueName}.`);
    } 
    else {
        console.log(`${teamName} is not on ${leagueName}.`);
    } // no need to close page; index.js does it already
}

export {searchStanding};