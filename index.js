#!/usr/bin/env node

import {program} from "commander";
import puppeteer from "puppeteer";
import chalk from "chalk";
import figlet from "figlet";
import { getPositionPrem, getPositionLaLiga, getPositionBund } from "./algorithms/standing.js";
import { leagueList, teamList, positionList } from "./lexicon.js";

// TODO: figure out undashed commands
program 
    .version("1.0.0")
    .name("first-cli")
    .description("test for hackathon: search for team's standing in leagues")
    .command('search-standing <team> [league]') // switch up order
    .option("-l, --league <type>", "league name")
    .option("-t, --team <type>", "team name")

program
    .option("-c, --coach", "head coach") // future feature
    .option("--xi, --startingxi", "starting eleven") // must be double dashes for non single-character flags
    .option("-g, --g <type> <type>", "look up games") // future feature
    .option("-p, --position", "position") // future feature

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
const command = program.args[0]; // take command

// take user value (not the flag), search the value in the map, make const variable for value
// league: --league flag
// targetLeague: --league three-letter code value that user inputs, key in LeagueList
// leagueName: the value in LeagueList that corresponds with the key (targetLeague) 
const targetLeague = options.league || program.args[2];
const leagueName = leagueList[targetLeague];
const targetTeam = options.team || program.args[1]; // args[2] is the positional <team>
const teamName = teamList[targetTeam];

// style
const terminalWidth = process.stdout.columns;
const line = "-";
const horizontal = line.repeat(terminalWidth);


/* error messages
if (!teamName) {
    console.log(`ERROR: Unknown team code ${team}`); 
    process.exit(1); } 
if (league && !leagueName) {
    console.log(`Error: Unknown league name ${league}`); 
    process.exit(1); }
*/

// main
async function main(command) {
    console.log(horizontal);
    console.log(chalk.yellow(figlet.textSync("FootballWatcher", {horizontalLayout:"full"})) );
    console.log(horizontal);

    try {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
    
        if (command === "search-standing") {
            if(leagueName && leagueName === "Premier League") {
                await getPositionPrem(page, teamName); // put await to make sure one process closes before another starts
            } else if (leagueName && leagueName === "La Liga") {
                await getPositionLaLiga(page, teamName); 
            } else if (leagueName && leagueName === "German Bundesliga") {
                await getPositionBund(page, teamName);
            } else {
                await getPositionPrem(page, teamName);
                await getPositionLaLiga(page, teamName); 
                await getPositionBund(page, teamName); }
        }
        
        if(teamName === "Tottenham Hostpur") {
            console.log("COYS!");
        }
        if(teamName === "Barcelona") {
            const redWord = chalk.red("y visca");
            const blueWord = chalk.blue("catalunya!");
            const visca = figlet.textSync("Visca");
            const barca = figlet.textSync("Barca!");
            console.log(chalk.red(figlet.textSync("Visca", {horizontalLayout:"full"})));
            console.log(chalk.blue(figlet.textSync("Barca", {horizontalLayout:"full"})));
            console.log(`${redWord} ${blueWord}`); 
        }
        if(teamName === "Real Madrid") {
            const yellowWord = chalk.yellow("Hala Madrid!");
            console.log(`${yellowWord}`); 
        }

        console.log(horizontal);

        await page.close();
        await browser.close();
    } catch (err) {
        console.error("Error: ", err);
    }
}

main(command); 
