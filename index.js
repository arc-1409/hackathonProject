#!/usr/bin/env node

import {program} from "commander";
import inquirer from "inquirer";
import chalk from "chalk";
import figlet from "figlet";

const commander = require("commander");
const program = new commander.Command();
const options = program.opts();

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

if (options.help) {
    console.log(`
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
}

program.parse(process.argv);

const league = options.league;
const leagueName = leagueList[league];
const team = options.team;
const teamName = teamList[team];

// pass to functions in app.js
if(leagueName === "Premier League") {
    getPositionPrem(teamName); } 
else if (leagueName === "La Liga") {
    getPositionLaLiga(teamName); } 
else {
    getPositionPrem(teamName);
    getPositionLaLiga(teamName); }
