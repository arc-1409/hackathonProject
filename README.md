# FootballWatcher

A CLI application for tracking football matches and updates right in your terminal. Inspired by the team's lifelong love of European football, this project aims to provide easy and aesthetic access of live football information using code. 

Our team recognizes a lack of concentrated collection of resources and analyses on football, contrary to other popular sports such as basketball. And as football players and enjoyers ourselves who also love analyzing and debating among ourselves on various aspects of football (teams, players, management, transfers) about as much as we love coding haha, we decide to build a CLI application to fill this gap. This project started on September 20th, but we will continue to build more and more features on it. 

Try guessing which teams we support!

## ✨ Existing Features

- Track your football teams' live rankings in Premier League, La Liga, and German Bundesliga

...and more to come in the future!

## 🛠️ Tools Used

- **node.js**: javascript environment where this command line project is written on
- **commander.js**: a node.js library, provides definable commands and options that take user input for command line interfaces
- **puppeteer.js**: also a node.js library, performs web-scraping that can do a wide range of tasks on Chrome browsers including looking up information
- **FIGlet**: a program that makes ASCII art. we use this to stylize our application title everytime a user utilizes its functionalities
- **chalk**: a terminal program whose API can add colors to words, including stylized FIGlet art
- **inquirer.js**: another node.js library that also takes prompts, much like commander. we're working on this one!

## 🔑 Installation

Start by cloning the repository in your terminal:

```bash
git clone https://github.com/arc-1409/FootballWatcher.git
cd football-watcher
```

Install dependencies (if applicable):

```bash
# For Node.js projects
npm install
```

## 💡 Usage

```bash
node index.js [options]
```

### Team name input

All team name inputs are in the format of the team's three-letter code. Refer to lexicon.js or [this link](https://liaison.reuters.com/tools/sports-team-codes) for the team name codes.

### Example commands

```bash
node index.js search-standing bar 
node index.js search-standing rma laliga
node index.js --help
```

## 🧮 Options

- `-l, --league <name>`: Identify the league
- `-t, --team <name>`: Track a specific football team
- `-h, --help`: Show usage instructions

## 🏁 Most Recent Updates

- Resolved bugs in team lookups
- Added German Bundesliga to the Lexicon
- Swtiched up to using commander.js's command positionals instead of flags
- Centralize, compress, and optimize algorithms as well as deleted unneeded folders for cleaner code and file organization

## ⏳ Future Features

We plan to work on adding these features in the future, in no particular order yet:  

- Most recent match result
- Star favorite teams and leagues to follow-up
- starting xi
- league table look up
- player position
- coach lookup
- flexibility: support both positionals and flags

## 🫂 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

See [LICENSE](LICENSE) for details.

---

*FootballWatcher is an open-source project. Feel free to use, modify, and contribute!*

# hackathonProject
This is a hackathon project
Hi, This is the project. 
author: Lulu, William, Edward  
