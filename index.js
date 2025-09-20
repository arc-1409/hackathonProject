#!/usr/bin/env node

import {program} from "commander";
import inquirer from "inquirer";
import chalk from "chalk";
import figlet from "figlet";

const commander = require("commander");
const program = new commander.Command();

program 
    .version("1.0.0")
    .name("first-cli")
    .description("test for hackathon")
    .option("-p, --premier <type>", "premier league")
    .option("-l, --laliga <type>", "la liga")
    .option("-r, --report", "report")
    //Premier League teams
    .option("-afc, --arsenal", "Premier League")
    .option("-avl, --astonvilla", "Premier League")
    .option("-bou, --bournemouth", "Premier League")
    .option("-bre, --brentford", "Premier League")
    .option("-bha, --brighton", "Premier League")
    .option("-che, --chelsea", "Premier League")
    .option("-cry, --crystalpalace", "Premier League")
    .option("-eve, --everton", "Premier League")
    .option("-ful, --fulham", "Premier League")
    .option("-ips, --ipswich", "Premier League")
    .option("-lei, --leicester", "Premier League")
    .option("-liv, --liverpool", "Premier League")
    .option("-mci, --mancity", "Premier League")
    .option("-mun, --manutd", "Premier League")
    .option("-new, --newcastle", "Premier League")
    .option("-nfo, --nottinghamforest", "Premier League")
    .option("-sou, --southampton", "Premier League")
    .option("-tot, --tottenham", "Premier League")
    .option("-whu, --westham", "Premier League")
    .option("-wol, --wolves", "Premier League")
    //Laliga teams
    .option("-alv, --alaves", "La Liga")
    .option("-alm, --almeria", "La Liga")
    .option("-ath, --athletic", "La Liga")
    .option("-atm, --atleticomadrid", "La Liga")
    .option("-bar, --barcelona", "La Liga")
    .option("-bet, --betis", "La Liga")
    .option("-cel, --celtavigo", "La Liga")
    .option("-get, --getafe", "La Liga")
    .option("-gir, --girona", "La Liga")
    .option("-gra, --granada", "La Liga")
    .option("-lpa, --laspalmas", "La Liga")
    .option("-leg, --leganes", "La Liga")
    .option("-mlc, --mallorca", "La Liga")
    .option("-osa, --osasuna", "La Liga")
    .option("-ray, --rayo", "La Liga")
    .option("-rma, --realmadrid", "La Liga")
    .option("-rso, --realsociedad", "La Liga")
    .option("-sev, --sevilla", "La Liga")
    .option("-val, --valencia", "La Liga")
    .option("-vll, --valladolid", "La Liga");



program.parse(process.argv);

const options = program.opts();



function findTeam(input, teams) {
  const code = input.toUpperCase();
  if (teams[code]) return teams[code];
  const match = Object.values(teams).find(
    (t) => t.toLowerCase() === input.toLowerCase()
  );
  return match || input;
}

if (options.premier)


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



