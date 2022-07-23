import {
  ApplicationCommandOptionData,
  ApplicationCommandOptionType,
  ChatInputCommandInteraction,
  Client,
} from "discord.js"
import { ReacordDiscordJs } from "reacord"
import React from "react"
import { Counter } from "./counter"

type Command = {
  name: string
  description: string
  options?: ApplicationCommandOptionData[]
  run: (context: CommandContext) => void | Promise<unknown>
}

type CommandContext = {
  interaction: ChatInputCommandInteraction
  client: Client
  reacord: ReacordDiscordJs
}

const commands: Command[] = [
  {
    name: "ping",
    description: "pong!",
    run: ({ interaction, reacord }) => {
      reacord.reply(interaction, "pong!")
    },
  },
  {
    name: "counter",
    description: "count things",
    options: [
      {
        name: "initial-count",
        description: "the number to start at",
        type: ApplicationCommandOptionType.Integer,
      },
    ],
    run: ({ interaction, reacord }) => {
      const initialCount = interaction.options.getInteger("initial-count") ?? 0
      reacord.reply(interaction, <Counter initialCount={initialCount} />)
    },
  },
]

export function setupCommands(client: Client<true>, reacord: ReacordDiscordJs) {
  client.once("ready", async () => {
    try {
      const applicationCommands = commands.map((command) => ({
        name: command.name,
        description: command.description,
        options: command.options,
      }))

      await client.application.commands.set(applicationCommands)

      const commandNames = applicationCommands.map((c) => c.name).join(", ")
      console.info("Registered commands:", commandNames)
    } catch (error) {
      console.error("Failed to register commands:", error)
    }
  })

  client.on("interactionCreate", async (interaction) => {
    if (!interaction.isChatInputCommand()) return

    const command = commands.find((c) => c.name === interaction.commandName)
    try {
      await command?.run({ interaction, client, reacord })
    } catch (error) {
      console.error(`Failed to run command "${command?.name}":`, error)
    }
  })
}
