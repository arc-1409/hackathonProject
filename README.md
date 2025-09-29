# FootballWatcher

A CLI application for tracking football matches and updates right in your terminal. Inspired by the team's lifelong love of European football, this project aims to provide easy and aesthetic access of live football information using code. The application is written entirely in Javascript and with Node.js. As of now, we've only included two football leagues: Premier League and La Liga, but more will be added in the future. 

Try every team to see which teams we support! 

## Existing Features

- Track your football teams' live rankings in Premier League, La Liga, and German Bundesliga

...and more to come in the future!

## Tools Used

- **node.js**: javascript environment where this command line project is written on
- **commander.js**: a node.js library, provides definable commands and options that take user input for command line interfaces
- **puppeteer.js**: also a node.js library, performs web-scraping that can do a wide range of tasks on Chrome browsers including looking up information
- **FIGlet**: a program that makes ASCII art. we use this to stylize our application title everytime a user utilizes its functionalities
- **chalk**: a terminal program whose API can add colors to words, including stylized FIGlet art
- **inquirer.js**: another node.js library that also takes prompts, much like commander. we're working on this one!

## Installation

Start by cloning the repository in your terminal:

```bash
git clone https://github.com/arc-1409/FootballWatcher.git
cd FootballWatcher
```

Install dependencies (if applicable):

```bash
# For Node.js projects
npm install
```

## Usage

```bash
node index.js [options]
```

### Team name input

All team name inputs are in the format of the team's three-letter code. Refer to lexicon.js or [this link](https://liaison.reuters.com/tools/sports-team-codes) for the team name codes.

### Example commands

```bash
node footballwatcher.js -l premier -t bar
node footballwatcher.js -t rma
node footballwatcher.js --live
node footballwatcher.js --help
```

## Options

- `-l, --league <name>`: Identify the league
- `-t, --team <name>`: Track a specific football team
- `-h, --help`: Show usage instructions

## Most Recent Updates

- Resolved bugs in team lookups
- Added German Bundesliga to the Lexicon

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

See [LICENSE](LICENSE) for details.

---

*FootballWatcher is an open-source project. Feel free to use, modify, and contribute!*

# hackathonProject
This is a hackathon project
Hi, This is the project. 
author: Lulu, William, Edward  
