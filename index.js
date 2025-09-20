#!/usr/bin/env node

import {program} from "commander";
import inquirer from "inquirer";
import chalk from "chalk";
import figlet from "figlet";

const commander = require("commander");
const program = new commander.Command();

const teamMap = {
    premier: "Premier League",
    laliga: "La Liga"
}

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

program.parse(process.argv);

const options = program.opts();
if (options.help) {
    console.log(`
=== FootballWatcher User Guide ===

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
}



/*
console.log(
    chalk.magenta(figlet.textSync("CLI DEMO", { horizontalLayout:"full" }))
);


const promptMode = [
    {
        type: "list",
        name: "mode prompt",
        message: "seek it out and ye shall find.",
        choices: [
            "league table lookup",
            "team position lookup",
            "future match lookup"
        ]
    }
];

const promptLeague = [
    {
        type: "list",
        name: "league prompt",
        message: "pick a league: ",
        choices: [
            "premier league",
            "la liga",
            "uefa champions leauge"
        ]
    }
];

const promptTeam = [
    {
        type: "input",
        name: "team prompt",
        message: "enter any team on the premier league, laliga, or champions league: ",
        validate(team) {
            if(!team) {
                return "Enter a team name."
            }
            if(team.notOntTable()) {
                return "Enter a team that's actually on the table."
            }
            return true;
        }
    }
];
*/



