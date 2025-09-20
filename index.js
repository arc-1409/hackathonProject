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
    .option("-afc, --arsenal", "arsenal")
    .option("-avl, --astonvilla", "aston villa")
    .option("-bou, --bournemouth", "bournemouth")
    .option("-bre, --brentford", "brentford")
    .option("-bha, --brighton", "brighton")
    .option("-che, --chelsea", "chelsea")
    .option("-cry, --crystalpalace", "crystal palace")
    .option("-eve, --everton", "everton")
    .option("-ful, --fulham", "hulham")
    .option("-ips, --ipswich", "ipswich")
    .option("-lei, --leicester", "leicester")
    .option("-liv, --liverpool", "liverpool")
    .option("-mci, --mancity", "manchester city")
    .option("-mun, --manutd", "manchester united")
    .option("-new, --newcastle", "newcastle")
    .option("-nfo, --nottinghamforest", "nottingham forest")
    .option("-sou, --southampton", "southhampton")
    .option("-tot, --tottenham", "tottenham hostpur")
    .option("-whu, --westham", "westham")
    .option("-wol, --wolves", "wolves")
    //Laliga teams
    .option("-alv, --alaves", "deportivo alaves")
    .option("-alm, --almeria", "almeria")
    .option("-ath, --athletic", "athletic")
    .option("-atm, --atleticomadrid", "atletico madrid")
    .option("-bar, --barcelona", "barcelona")
    .option("-bet, --betis", "betis")
    .option("-cel, --celtadevigo", "celta de vigo")
    .option("-get, --getafe", "getafe")
    .option("-gir, --girona", "girona")
    .option("-gra, --granada", "granada")
    .option("-lpa, --laspalmas", "las palmas")
    .option("-leg, --leganes", "leganés")
    .option("-mlc, --mallorca", "mallorca")
    .option("-osa, --osasuna", "osasuna")
    .option("-ray, --rayo", "rayo")
    .option("-rma, --realmadrid", "real madrid")
    .option("-rso, --realsociedad", "real sociedad")
    .option("-sev, --sevilla", "sevilla")
    .option("-val, --valencia", "valencia")
    .option("-vll, --valladolid", "valladolid");



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



