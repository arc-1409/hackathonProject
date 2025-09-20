#!/usr/bin/env node
const inquirer = require("inquirer");
const puppeteer = require("puppeteer");

const LEAGUE_URLS = {
  "Premier League": "https://www.bbc.com/sport/football/premier-league/table",
  "La Liga": "https://www.bbc.com/sport/football/spanish-la-liga/table",
};

let _browser;
async function getBrowser() {
  if (_browser && (await _browser.process())) return _browser;
  _browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  return _browser;
}

async function maybeDismissConsent(page) {
  try {
    await page.waitForSelector(
      'button[aria-label*="Consent"], button[aria-label*="Agree"], button:has-text("I agree")',
      { timeout: 2000 }
    );
    await page.click(
      'button[aria-label*="Consent"], button[aria-label*="Agree"], button:has-text("I agree")'
    );
  } catch {
  }
}

// Core: scrape standings
async function scrapeStandings(url) {
  const browser = await getBrowser();
  const page = await browser.newPage();
  try {
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome Safari"
    );
    await page.goto(url, { waitUntil: "networkidle2", timeout: 45_000 });
    await maybeDismissConsent(page);
    await page.waitForSelector("table tbody tr", { timeout: 15_000 });

    // Detect which column has team names
    const nameColIndex = await page.$$eval("table thead tr th", (ths) => {
      const idx = ths.findIndex((th) =>
        /team|club|name/i.test((th.textContent || "").trim())
      );
      return idx >= 0 ? idx : 1;
    });

    const rows = await page.$$eval(
      "table tbody tr",
      (trs, nameIdx) => {
        const out = [];
        for (const tr of trs) {
          const tds = Array.from(tr.querySelectorAll("td"));
          if (!tds.length) continue;
          const position = (tds[0]?.textContent || "").trim();
          const name = (tds[nameIdx]?.textContent || "").trim();
          if (position && name) out.push({ position, name });
        }
        return out;
      },
      nameColIndex
    );

    return rows
      .map((t) => ({
        position: Number(String(t.position).replace(/\D+/g, "")),
        name: t.name,
      }))
      .filter((t) => Number.isFinite(t.position) && t.name)
      .sort((a, b) => a.position - b.position);
  } finally {
    await page.close().catch(() => {});
  }
}

// --------- Public helpers (case-insensitive) ----------
async function getFull(leagueName) {
  const url = LEAGUE_URLS[leagueName];
  if (!url) throw new Error(`Unsupported league: ${leagueName}`);
  return await scrapeStandings(url);
}

async function getPosition(leagueName, teamName) {
  const table = await getFull(leagueName);
  const query = String(teamName).trim().toLowerCase();

  const row = table.find((r) => r.name.toLowerCase() === query);
  if (row) {
    return { found: true, league: leagueName, team: row.name, position: row.position };
  }

  // Suggestions if not found
  const suggestions = table
    .map((r) => r.name)
    .filter((n) => n.toLowerCase().includes(query))
    .slice(0, 3);

  return { found: false, league: leagueName, team: teamName, suggestions };
}

// --------- CLI flow ----------
async function askLeague() {
  const { league } = await inquirer.prompt([
    { type: "list", name: "league", message: "Which league are you finding?", choices: Object.keys(LEAGUE_URLS) },
  ]);

  const { specific } = await inquirer.prompt([
    { type: "confirm", name: "specific", message: "Are you looking for a specific team?", default: true },
  ]);

  if (specific) {
    const { team } = await inquirer.prompt([
      {
        type: "input",
        name: "team",
        message: "Enter the team name (case does not matter):",
      },
    ]);
    const res = await getPosition(league, team);
    if (res.found) {
      console.log(`${res.team} is currently in position ${res.position} in ${res.league}.`);
    } else {
      const extra =
        res.suggestions && res.suggestions.length
          ? ` Did you mean: ${res.suggestions.join(", ")}?`
          : "";
      console.log(`Couldn't find "${res.team}" in ${res.league}.${extra}`);
    }
  } else {
    const table = await getFull(league);
    console.log(`${league} Standings:`);
    table.forEach((t) => console.log(`${t.position}. ${t.name}`));
  }
}

// --------- Convenience exports ----------
async function getFullPrem() {
  return getFull("Premier League");
}
async function getFullLaLiga() {
  return getFull("La Liga");
}
async function getPositionPrem(teamName) {
  return getPosition("Premier League", teamName);
}
async function getPositionLaLiga(teamName) {
  return getPosition("La Liga", teamName);
}

// Run directly
if (require.main === module) {
  askLeague()
    .catch((err) => console.error("[error]", err?.message || err))
    .finally(async () => {
      try {
        if (_browser) await _browser.close();
      } catch {}
    });
}

module.exports = {
  askLeague,
  getFullPrem,
  getFullLaLiga,
  getPositionPrem,
  getPositionLaLiga,
};
