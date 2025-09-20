#!/usr/bin/env node

const commander = require("commander");
const chalk = require("chalk");
const figlet = require("figlet");
const { getPositionPrem, getPositionLaLiga, getFullPrem, getFullLaLiga } = require("./app");

const program = new commander.Command();

const premierTeams = [
    "Arsenal", "Aston Villa", "AFC Bournemouth", "Brentford", "Brighton & Hove Albion",
    "Chelsea", "Crystal Palace", "Everton", "Fulham", "Liverpool", "Leeds United",
    "Manchester City", "Manchester United", "Newcastle United", "Nottingham Forest",
    "Southampton", "Sunderland", "Tottenham Hotspur", "West Ham United", "Wolverhampton Wanderers"
];

const laLigaTeams = [
    "Alavés", "Athletic Club", "Atletico Madrid", "Barcelona", "Real Betis", "Celta Vigo",
    "Espanyol", "Elche", "Getafe", "Girona", "Levante", "Mallorca", "Osasuna", "Real Oviedo",
    "Rayo Vallecano", "Real Madrid", "Real Sociedad", "Sevilla", "Valencia", "Villarreal"
];

program
    .version("1.0.0")
    .name("FootballWatcher")
    .description("Track football teams and leagues from your terminal.")
    .option("-p, --premier <team>", "Premier League: specify a team or 'table' for full league table")
    .option("-l, --laliga <team>", "La Liga: specify a team or 'table' for full league table")
    .option("-h, --help", "Show this help message");

// Add team options for autocomplete/reference (not required for main logic)
program
    .option("-che, --chelsea", "Chelsea")
    .option("-rma, --realmadrid", "Real Madrid")
    .option("-bar, --barcelona", "Barcelona");
// ...add more team option tags as needed for autocomplete

program.parse(process.argv);
const options = program.opts();

function printHelp() {
    console.log(chalk.green(figlet.textSync("FootballWatcher", { horizontalLayout: "full" })));
    console.log(`
=== FootballWatcher User Guide ===

Usage:
    football-watcher --premier <team>
    football-watcher --laliga <team>
    football-watcher --premier table
    football-watcher --laliga table
    football-watcher --help

Options:
    -p, --premier <team>    Premier League: team name or 'table'
    -l, --laliga <team>     La Liga: team name or 'table'
    -h, --help              Show this help message

Team name examples:
    --premier Chelsea
    --laliga Barcelona

To show the full league table:
    --premier table
    --laliga table

Notes:
    - Team names are case sensitive.
    - Only one league may be specified per command.
    - If you specify a team name that is not in the league, you'll get a list of valid teams.
`);
}

function validateAndRun(options) {
    if (options.help || Object.keys(options).length === 0) {
        printHelp();
        return;
    }

    if (options.premier && options.laliga) {
        console.error(chalk.red("Error: Please choose only one league: Premier League OR La Liga."));
        return;
    }

    // Premier League
    if (options.premier) {
        if (options.premier.toLowerCase() === "table") {
            getFullPrem();
            return;
        }
        if (!premierTeams.includes(options.premier)) {
            console.error(chalk.red(`Error: Unknown Premier League team "${options.premier}".`));
            console.log(`Valid teams: ${premierTeams.join(", ")}`);
            return;
        }
        getPositionPrem(options.premier, true);
        return;
    }

    // La Liga
    if (options.laliga) {
        if (options.laliga.toLowerCase() === "table") {
            getFullLaLiga();
            return;
        }
        if (!laLigaTeams.includes(options.laliga)) {
            console.error(chalk.red(`Error: Unknown La Liga team "${options.laliga}".`));
            console.log(`Valid teams: ${laLigaTeams.join(", ")}`);
            return;
        }
        getPositionLaLiga(options.laliga, true);
        return;
    }

    // If no valid options matched
    console.error(chalk.red("Error: Invalid or incomplete command."));
    printHelp();
}

validateAndRun(options);
