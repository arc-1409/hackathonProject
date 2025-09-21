# FootballWatcher

A CLI application for tracking football matches and updates right in your terminal. Inspired by the team's lifelong love of European football, this project aims to provide easy and aesthetic access of live football information using code. The application is written entirely in Javascript and with Node.js. Tools such as commander, inquirer, chalk, figlet, and puppeteer were used. As of now, we've only included two football leagues: Premier League and La Liga, but more will be added in the future. 

Try every team to see which teams we support! 

## Features

- Get live ranking for football games
- Track your favorite teams directly in the terminal
- Simple, fast, and easy-to-use interface

## Installation

Clone the repository:

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
node footballwatcher.js [options]
```

### Team name input

All team name inputs are in the format of the team's three-letter code. Refer to [this link](https://liaison.reuters.com/tools/sports-team-codes) for the team name codes.

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
- `--live`: Show live matches
- `-h, --help`: Show usage instructions

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
