#!/usr/bin/env node

import {program} from "commander";
import puppeteer from "puppeteer";
import chalk from "chalk";
import figlet from "figlet";
import { searchStanding } from "./algorithms.js";
import { leagueList, teamList, positionList } from "./lexicon.js";

/*
TODO 
- figure out how/where to store documentation
- add use case file
- algorithm 2: most recent match result 
*/

// global options
program
    .option("-t, --team <type>", "team name")
    .option("-l, --league <type>", "league name")

program 
    .version("1.0.0")
    .name("first-cli")
    .description("test for hackathon: search for team's standing in leagues")
    .command('search-standing [team] [league]') // switch up order
    .option("-l, --league <type>", "league name")
    .option("-t, --team <type>", "team name")
    .action((teamArg, leagueArg) => {
        const options = program.opts(); // must be after parsing

        let targetLeague = leagueArg;
        let targetTeam = teamArg;
        
        if (options.league) {
            targetLeague = options.league;
        } 

        if (options.team) {
            targetTeam = options.team;
        } 

        const leagueName = leagueList[targetLeague];
        const teamName = teamList[targetTeam];

        if (!targetTeam) {
            console.error("Error: please specify team name.");
            process.exit(1);
        }

        // create object to simplify function calling
        const teamLeague = {
            team: teamName,
            league: leagueName,
        }

        main("search-standing", teamLeague); // { leagueName, teamName }
    });  

program
    .option("-c, --coach", "head coach") // future feature
    .option("--xi, --startingxi", "starting eleven") // must be double dashes for non single-character flags
    .option("-g, --g <type> <type>", "look up games") // future feature
    .option("-p, --position", "position") // future feature

// --help is built in; this is customized
program.addHelpText("beforeAll", `
================================ FootballWatcher User Guide ================================

Commands: 
    search-standing <team> [league]         search for a team's current standing

Options: 
    -h, --help                              User guide
    -l, --league <type>                     League tag, must include league name after; optional
    -t, --team <type>                       Team tag, must include team tag after

Team Tag examples: 
    bar                     Barcelona
    rma                     Real Madrid

For more information, visit the GitHub page: https://github.com/arc-1409/FootballWatcher.git 
        `);

program.parse(process.argv);

// main
async function main(command, obj) {
    // style
    const terminalWidth = process.stdout.columns;
    const line = "-";
    const horizontal = line.repeat(terminalWidth);

    console.log(horizontal);
    console.log(chalk.yellow(figlet.textSync("FootballWatcher", {horizontalLayout:"full", font: "Star Wars"})) ); // font: https://www.figlet.org/examples.html
    console.log(horizontal);

    try {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
    
        if (command === "search-standing") {
            await searchStanding(page, obj); // take object itself instead of property; good practise
            
            // easter egg; might move out of loop later
            if(obj.team === "Tottenham Hostpur") {
                console.log("COYS!");
            }

            if(obj.team === "Barcelona") {
                const redWord = chalk.red("y visca");
                const blueWord = chalk.blue("catalunya!");
                const visca = figlet.textSync("Visca");
                const barca = figlet.textSync("Barca!");
                console.log(chalk.red(figlet.textSync("Visca", {horizontalLayout:"full"})));
                console.log(chalk.blue(figlet.textSync("Barca", {horizontalLayout:"full"})));
                console.log(`${redWord} ${blueWord}`); 
            }
            if(obj.team === "Real Madrid") {
                const yellowWord = chalk.yellow("Hala Madrid!");
                console.log(`${yellowWord}`); 
            }
        }

        console.log(horizontal);

        await page.close();
        await browser.close();
    } catch (err) {
        console.error("Error: ", err);
    }
}
