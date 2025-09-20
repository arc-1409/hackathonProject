#!/usr/bin/env node

import {program} from "commander";
import inquirer from "inquirer";
import chalk from "chalk";
import figlet from "figlet";

const commander = require("commander");
const program = new commander.Command();
const inquirer = require("inquirer");
const options = program.opts();
const chalk = require("chalk");
const figlet = require("figlet");
const { getPositionPrem, getPositionLaLiga, getFullPrem, getFullLaLiga } = require("./app");

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
        
    
    
    function findTeam(input, teams) {
      const code = input.toUpperCase();
      if (teams[code]) return teams[code];
      const match = Object.values(teams).find(
        (t) => t.toLowerCase() === input.toLowerCase()
      );
      return match || input;
    }
    
    const { getPositionPrem, getPositionLaLiga, getFullPrem, getFullLaLiga } = require("./app");
    
    async function askLeague() {
      const { league } = await inquirer.prompt([
        {
          type: "list",
          name: "league",
          message: "Which league are you finding?",
          choices: ["Premier League", "La Liga"]
        }
      ]);
    
      const { specific } = await inquirer.prompt([
        {
          type: "confirm",
          name: "specific",
          message: "Are you looking for a specific team?",
          default: true
        }
      ]);
    
      if (specific) {
        const { team } = await inquirer.prompt([
          {
            type: "input",
            name: "team",
            message: "Enter the team name:"
          }
        ]);
    
        if (league === "Premier League") {
          await getPositionPrem(team, true);
        } else {
          await getPositionLaLiga(team, true);
        }
      } else {
        if (league === "Premier League") {
          await getFullPrem();
        } else {
          await getFullLaLiga();
        }
      }
    }
    
    askLeague();



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



