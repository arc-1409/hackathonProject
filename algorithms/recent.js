import puppeteer from "puppeteer";

async function recentPrem(page, teamName) {
    await page.goto("https://www.bbc.com/sport/football/premier-league/table", { waitUntil: "networkidle2"});
    await page.waitForSelector("tr[class*='CellsRow']");

    const teamsList = await page.$$eval("tr[class*='CellsRow']", rows => {
        return rows.map(row => {
            const recent = row.querySelector("ssrcss-1xnub2d-LetterContainer")?.textContent.trim();
            let name = row.querySelector("span.visually-hidden")?.innerText.trim();
            if (!name) {
                name = row.querySelector("span[aria-hidden='true'][data-600]")?.getAttribute("data-600")?.trim();
            }

            return { recent, name };
        });
    });

    const team = teamsList.find(t => t.name?.lowerCase() === teamName.toLowerCase());
    
    if (recent === "W") {
        console.log(`${teamName}'s most recent game was a WIN. congratulations!`);
    } else if (recent === "D") {
        console.log(`${teamName}'s most recent game was a draw.`);
    } else if (recent === "L") {
        console.log(`${teamName}'s most recent game was a loss. Better luck next time!`);
    }
}

export { recentPrem };
