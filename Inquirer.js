const inquirer = require("inquirer");
const { getPositionPrem, getPositionLaLiga, getFullPrem, getFullLaLiga } = require("./app");

async function askLeague() {
  const { league } = await inquirer.prompt([
    {
      type: "list",
      name: "league",
      message: "Which league are you finding?",
      choices: ["Premier League", "La Liga"],
    },
  ]);

  const { specific } = await inquirer.prompt([
    {
      type: "confirm",
      name: "specific",
      message: "Are you looking for a specific team?",
      default: true,
    },
  ]);

  if (specific) {
    const { team } = await inquirer.prompt([
      {
        type: "input",
        name: "team",
        message: "Enter the team name:",
      },
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

module.exports = { askLeague };

