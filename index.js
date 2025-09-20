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
    .option("-p, --premier <type>", "premier league")
    .option("-l, --laliga <type>", "la liga")
    //Premier League teams
    .option("-afc, --arsenal", "Arsenal")
    .option("-avl, --astonvilla", "Aston Villa")
    .option("-bou, --bournemouth", "AFC Bournemouth")
    .option("-bre, --brentford", "Brentford")
    .option("-bha, --brighton", "Brighton & Hove Albion")
    .option("-che, --chelsea", "Chelsea")
    .option("-cry, --crystalpalace", "Crystal Palace")
    .option("-eve, --everton", "Everton")
    .option("-ful, --fulham", "Fulham")
    .option("-liv, --liverpool", "Liverpool")
    .option("-lee, --leeds", "Leeds United")
    .option("-mci, --mancity", "Manchester City")
    .option("-mun, --manutd", "Manchester United")
    .option("-new, --newcastle", "Newcastle United")
    .option("-nfo, --nottinghamforest", "Nottingham Forest")
    .option("-sou, --southampton", "Southhampton")
    .option("-sun, --sunderland", "Sunderland")
    .option("-tot, --tottenham", "Tottenham Hostpur")
    .option("-whu, --westham", "West Ham United")
    .option("-wol, --wolves", "Wolverhampton Wanderers")
    //Laliga teams
    .option("-alv, --alaves", "Alavés")
    .option("-ath, --athletic", "Athletic Club")
    .option("-atm, --atleticomadrid", "Atletico Madrid")
    .option("-bar, --barcelona", "Barcelona")
    .option("-bet, --betis", "Real Betis")
    .option("-cel, --celtavigo", "Celta Vigo")
    .option("-esp, --espanyol", "Espanyol")
    .option("-elc, --elche", "Elche")
    .option("-get, --getafe", "Getafe")
    .option("-gir, --girona", "Girona")
    .option("-lev, --levante", "Levante)
    .option("-mlc, --mallorca", "Mallorca")
    .option("-osa, --osasuna", "Osasuna")
    .option("-ovi, --oviedo", "Real Oviedo")
    .option("-ray, --rayo", "Rayo Vallecano")
    .option("-rma, --realmadrid", "Real Madrid")
    .option("-rso, --realsociedad", "Real Sociedad")
    .option("-sev, --sevilla", "Sevilla")
    .option("-val, --valencia", "Valencia")
    .option("-vil, --villarreal", "Villarreal");

program.parse(process.argv);

const options = program.opts();
if (options.help) {
    console.log(`
=== FootballWatcher User Guide ===

Commands: 
    -h, --help              User guide
    -p, --premier <type>    Premier League tag, must include team tag after
    -l, --laliga <type>     La Liga tag, must include team tag after

Team tags are three-letter codes of the team or the full name with no space. Refer to: https://liaison.reuters.com/tools/sports-team-codes 
   
Team Tag examples: 
    -bar, --barcelona       Barcelona
    -rma, --realmadrid      Real Madrid

For more information, visit the GitHub page: https://github.com/arc-1409/FootballWatcher.git 
        `);
}

for (const key in options) {
    if(options[key] === true && key != "help" && !(key in teamMap)) {
        getPositionPrem(teamMap.key);
    }
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



