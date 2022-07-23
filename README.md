Welcome! This repo is a template for getting started with [Reacord](https://reacord.mapleleaf.dev/) and [Discord.js](https://discord.js.org/).

## Getting Started

Create a new project from this repo using `degit`, then install dependencies.

```bash
npx degit itsMapleleaf/reacord-starter new-reacord-app
cd new-reacord-app
npm install
```

[Create a Discord application for your bot](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot), then create a `.env` file and add your token to it:

```env
BOT_TOKEN=<your-token>
```

Then run `npm run dev` to run the bot in development mode.

Once your bot is running in a server, try out the `/ping` and `/counter` commands!

Run `npm run build` and `npm run start` to run the bot in production mode.
