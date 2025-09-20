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
    .option("-tot, --tottenham", "tottenham")
    .option("-l, --laliga <type>", "la liga")
    .option("-c, --ucl <type>", "champions league")
    .option("-r, --report", "report")

program.parse(process.argv);

const options = program.opts();

const premierTeams = {
  ARS: "Arsenal",
  AVL: "Aston Villa",
  BOU: "Bournemouth",
  BRE: "Brentford",
  BHA: "Brighton & Hove Albion",
  CHE: "Chelsea",
  CRY: "Crystal Palace",
  EVE: "Everton",
  FUL: "Fulham",
  IPS: "Ipswich Town",
  LEI: "Leicester City",
  LIV: "Liverpool",
  MCI: "Manchester City",
  MUN: "Manchester United",
  NEW: "Newcastle United",
  NFO: "Nottingham Forest",
  SOU: "Southampton",
  TOT: "Tottenham Hotspur",
  WHU: "West Ham United",
  WOL: "Wolverhampton Wanderers",
};

const laligaTeams = {
  ALV: "Alaves",
  ALM: "Almeria",
  ATH: "Athletic Club (Bilbao)",
  ATM: "Atletico Madrid",
  BAR: "Barcelona",
  BET: "Real Betis",
  CEL: "Celta Vigo",
  GET: "Getafe",
  GIR: "Girona",
  GRA: "Granada",
  LPA: "Las Palmas",
  LEG: "Leganes",
  MLL: "Mallorca",
  OSA: "Osasuna",
  RAY: "Rayo Vallecano",
  RMA: "Real Madrid",
  RSO: "Real Sociedad",
  SEV: "Sevilla",
  VAL: "Valencia",
  VLL: "Valladolid",
};

const uclTeams = {
  ARS: "Arsenal",
  ATL: "Atletico Madrid",
  BAR: "Barcelona",
  BAY: "Bayern Munich",
  BEN: "Benfica",
  BVB: "Borussia Dortmund",
  CHE: "Chelsea",
  INT: "Inter Milan",
  JUV: "Juventus",
  LIV: "Liverpool",
  MCI: "Manchester City",
  MUN: "Manchester United",
  MIL: "AC Milan",
  NAP: "Napoli",
  PSG: "Paris Saint-Germain",
  RMA: "Real Madrid",
  RBL: "RB Leipzig",
  POR: "Porto",
  SEV: "Sevilla",
  TOT: "Tottenham Hotspur",
};

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



