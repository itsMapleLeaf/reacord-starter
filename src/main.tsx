import { Client, GatewayIntentBits } from "discord.js"
import "dotenv/config"
import { ReacordDiscordJs } from "reacord"
import { setupCommands } from "./commands"

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
})

const reacord = new ReacordDiscordJs(client)

setupCommands(client, reacord)

client.once("ready", () => {
  console.info("Ready!")
})

client.login(process.env.BOT_TOKEN).catch(console.error)
