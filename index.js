#!/usr/bin/env node

import {program} from "commander";
import puppeteer from "puppeteer";
import chalk from "chalk";
import { getPositionPrem, getPositionLaLiga } from "./apps.js";

program 
    .version("1.0.0")
    .name("first-cli")
    .description("test for hackathon")
    .option("-l, --league <type>", "league name")
    .option("-t, --team <type>", "team name")

const leagueList = {
    prem: "Premier League",
    laliga: "La Liga"
};

const teamList = {
    ars: "Arsenal",
    avl: "Aston Villa", 
    bou: "AFC Bournemouth",
    bre: "Brentford",
    bha: "Brighton & Hove Albion",
    che: "Chelsea",
    cry: "Crystal Palace",
    eve: "Everton",
    ful: "Fulham",
    liv: "Liverpool",
    lee: "Leeds United",
    mci: "Manchester City",
    mun: "Manchester United",
    new: "Newcastle United",
    nfo: "Nottingham Forest",
    sou: "Southampton",
    sun: "Sunderland",
    tot: "Tottenham Hotspur",
    whu: "West Ham United",
    wol: "Wolverhampton Wanderers",
    alv: "Alavés",
    ath: "Athletic Club",
    atm: "Atletico Madrid",
    bar: "Barcelona",
    bet: "Real Betis",
    cel: "Celta Vigo", 
    esp: "Espanyol",
    elc: "Elche",
    get: "Getafe",
    gir: "Girona",
    lev: "Levante",
    mlc: "Mallorca",
    osa: "Osasuna",
    ovi: "Real Oviedo",
    ray: "Rayo Vallecano",
    rma: "Real Madrid",
    rso: "Real Sociedad",
    sev: "Sevilla",
    val: "Valencia",
    vil: "Villarreal"
};

// --help is built in; this is customized
program.addHelpText("beforeAll", `
================================ FootballWatcher User Guide ================================

Commands: 
    -h, --help              User guide
    -l, --league <type>     League tag, must include league name after; optional
    -t, --team <type>       Team tag, must include team tag after

Team names are three-letter codes of the team. Refer to: https://liaison.reuters.com/tools/sports-team-codes 
   
Team Tag examples: 
    bar                     Barcelona
    rma                     Real Madrid

For more information, visit the GitHub page: https://github.com/arc-1409/FootballWatcher.git 
        `);

program.parse(process.argv);

const options = program.opts(); // must be after parsing

// take user value (not the flag), search the value in the map, make const variable for value
const league = options.league;
const leagueName = leagueList[league];
const team = options.team;
const teamName = teamList[team];

// error messages
if (!teamName) {
    console.log(`ERROR: Unknown team code ${team}`); 
    process.exit(1); } 
if (league && !leagueName) {
    console.log(`Error: Unknown league name ${league}`); 
    process.exit(1); }

// main
async function main() {
    try {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();

        // pass to functions in app.js
        if(leagueName === "Premier League") {
            await getPositionPrem(page, teamName); }  // put await to make sure one process closes before another starts
        else if (leagueName === "La Liga") {
            await getPositionLaLiga(page, teamName); } 
        else {
            await getPositionPrem(page, teamName);
            await getPositionLaLiga(page, teamName); }

        if(teamName === "Tottenham Hostpur") {
            console.log(bold("COYS!"));
        }
        if(teamName === "Barcelona") {
            const redWord = chalk.red("Visca ");
            const blueWord = chalk.blue("Barca");
            console.log(bold(`${redWord} ${blueWord}`)); 
        }
        if(teamName === "Real Madrid") {
            const purpleWord = chalk.purple("Hala ");
            const whiteWord = chalk.bgWhite("Madrid");
            console.log(`${purpleWord} ${whiteWord}`); 
        }
        
        await page.close();
        await browser.close();
    } catch (err) {
        console.error("Error: ", err);
    }
}

main(); 
