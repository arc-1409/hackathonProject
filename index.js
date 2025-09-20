const inquirer = require("inquirer");
const puppeteer = require("puppeteer");

async function getPositionPrem(teamName, tagged) {
  const browser = await puppeteer.launch();
  try {
    const page = await browser.newPage();
    await page.goto("https://www.bbc.com/sport/football/premier-league/table", { waitUntil: "networkidle2" });
    await page.waitForSelector("table tbody tr");

    const teamsList = await page.$$eval("table tbody tr", rows =>
      rows.map(row => {
        const position = row.querySelector("td:first-child")?.textContent.trim();
        const name = row.querySelector("td:nth-child(2)")?.textContent.trim();
        return { position, name };
      })
    );

    const team = teamsList.find(t => t.name?.toLowerCase() === teamName.toLowerCase());

    if (tagged) {
      if (team) console.log(`${team.name} is currently in position ${team.position} in the Premier League.`);
      else console.log(`${teamName} is not in the Premier League.`);
    } else if (team) {
      console.log(`${team.name} is currently in position ${team.position} in the Premier League.`);
    }
  } finally {
    await browser.close();
  }
}

async function getPositionLaLiga(teamName, tagged) {
  const browser = await puppeteer.launch();
  try {
    const page = await browser.newPage();
    await page.goto("https://www.bbc.com/sport/football/spanish-la-liga/table", { waitUntil: "networkidle2" });
    await page.waitForSelector("table tbody tr");

    const teamsList = await page.$$eval("table tbody tr", rows =>
      rows.map(row => {
        const position = row.querySelector("td:first-child")?.textContent.trim();
        const name = row.querySelector("td:nth-child(2)")?.textContent.trim();
        return { position, name };
      })
    );

    const team = teamsList.find(t => t.name?.toLowerCase() === teamName.toLowerCase());

    if (tagged) {
      if (team) console.log(`${team.name} is currently in position ${team.position} in La Liga.`);
      else console.log(`${teamName} is not in La Liga.`);
    } else if (team) {
      console.log(`${team.name} is currently in position ${team.position} in La Liga.`);
    }
  } finally {
    await browser.close();
  }
}

async function getFullPrem() {
  const browser = await puppeteer.launch();
  try {
    const page = await browser.newPage();
    await page.goto("https://www.bbc.com/sport/football/premier-league/table", { waitUntil: "networkidle2" });
    await page.waitForSelector("table tbody tr");

    const teamsList = await page.$$eval("table tbody tr", rows =>
      rows.map(row => {
        const position = row.querySelector("td:first-child")?.textContent.trim();
        const name = row.querySelector("td:nth-child(2)")?.textContent.trim();
        return { position, name };
      })
    );

    console.log("Premier League Standings:");
    teamsList.forEach(t => console.log(`${t.position}. ${t.name}`));
  } finally {
    await browser.close();
  }
}

async function getFullLaLiga() {
  const browser = await puppeteer.launch();
  try {
    const page = await browser.newPage();
    await page.goto("https://www.bbc.com/sport/football/spanish-la-liga/table", { waitUntil: "networkidle2" });
    await page.waitForSelector("table tbody tr");

    const teamsList = await page.$$eval("table tbody tr", rows =>
      rows.map(row => {
        const position = row.querySelector("td:first-child")?.textContent.trim();
        const name = row.querySelector("td:nth-child(2)")?.textContent.trim();
        return { position, name };
      })
    );

    console.log("La Liga Standings:");
    teamsList.forEach(t => console.log(`${t.position}. ${t.name}`));
  } finally {
    await browser.close();
  }
}

async function askLeague() {
  const { league } = await inquirer.prompt([
    { type: "list", name: "league", message: "Which league are you finding?", choices: ["Premier League", "La Liga"] }
  ]);

  const { specific } = await inquirer.prompt([
    { type: "confirm", name: "specific", message: "Are you looking for a specific team?", default: true }
  ]);

  if (specific) {
    const { team } = await inquirer.prompt([
      { type: "input", name: "team", message: "Enter the team name:" }
    ]);

    if (league === "Premier League") await getPositionPrem(team, true);
    else await getPositionLaLiga(team, true);
  } else {
    if (league === "Premier League") await getFullPrem();
    else await getFullLaLiga();
  }
}

module.exports = { askLeague, getPositionPrem, getPositionLaLiga, getFullPrem, getFullLaLiga };
