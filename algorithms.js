import puppeteer from "puppeteer";

/*
TODO
- add recent match result algorithm
- fix -t option.team leagueArg error
*/

async function searchStanding(page, obj) {
    if(!("team" in obj)) {
        console.error("ERROR: undefined teamName");
    }

    let found = false;

    // filter leagues
    if(obj.league === "Premier League") {
        scrape("https://www.bbc.com/sport/football/premier-league/table", obj.league);
    } else if (obj.league === "La Liga") {
        scrape("https://www.bbc.com/sport/football/spanish-la-liga/table", obj.league);
    } else if (obj.league === "German Bundesliga") {
        scrape("https://www.bbc.com/sport/football/german-bundesliga/table", obj.league);
    } else if (!("league" in obj)) {  // for when league isn't specified2
        while (found === false) {
            console.log("should have three undefined?");
            scrape("https://www.bbc.com/sport/football/premier-league/table", "Premier League");
            timeout(500);

            console.log("or is it just stuck here");
            scrape("https://www.bbc.com/sport/football/spanish-la-liga/table", "La Liga");
            timeout(500);        

            console.log("here maybe?");
            scrape("https://www.bbc.com/sport/football/german-bundesliga/table", "German Bundesliga");
            timeout(500);
        }  
    } else {
        console.error("ERROR: unrecognized league name");
    }

    async function scrape(url, leagueResult) {
        await page.goto(url, { waitUntil: "networkidle2"});
        teamsList = await page.$$eval("tr[class*='CellsRow']", rows => {
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
            console.log(`${obj.team} is currently in position ${targetTeam.rank} on ${leagueResult}.`);
            found = true;
        } else {
            console.log(`${obj.team} is not on ${leagueResult}.`);
        } // no need to close page; index.js does it already
    }

    // waitForTimeout no longer works: https://github.com/spatie/browsershot/pull/834
    // https://stackoverflow.com/questions/74806202/how-can-i-add-a-settimeout-delay-to-my-browser-in-puppeteer 
    async function timeout(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

export {searchStanding};
