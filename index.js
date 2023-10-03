require('dotenv').config();

const fs = require('fs');
const { readdirSync } = require('fs');
const mongoose = require('mongoose')
const path = require('path');
const { Client, Collection, Events, GatewayIntentBits, Partials } = require('discord.js');
const config = require("./config.js")

const client = new Client({
    intents: [GatewayIntentBits.AutoModerationConfiguration, GatewayIntentBits.AutoModerationExecution, GatewayIntentBits.DirectMessageReactions, GatewayIntentBits.DirectMessageTyping, GatewayIntentBits.DirectMessages, GatewayIntentBits.GuildEmojisAndStickers, GatewayIntentBits.GuildIntegrations, GatewayIntentBits.GuildInvites, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildMessageTyping, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildModeration, GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildScheduledEvents, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildWebhooks, GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent],
    partials: [Partials.Message, Partials.Channel, Partials.GuildMember, Partials.Reaction, Partials.GuildScheduledEvent, Partials.User, Partials.ThreadMember],
    shards: "auto"
});
client.commands = new Collection();
client.commandsData = [];

/**
 * Connects to the database with mongoose
 */

(async () => {
    try {
      const uri = `mongodb+srv://${process.env.mongouser}:${process.env.mongotoken}@axediscord.3jbcjjp.mongodb.net/?retryWrites=true&w=majority`;
      const w = await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    } catch(err) {  
        throw console.log('\u001b[' + 32 + 'm' + `[FOUND]: ${path}\\${file}` + '\u001b[0m')
    }
})();

/**
 * Loads the commands for command handler
 */

readdirSync('./src/commands').forEach(async file => {
    console.log('\u001b[' + 32 + 'm' + `[LOADED COMMANDS]: ${file}` + '\u001b[0m')

    const command = await require(`./src/commands/${file}`);
    client.commandsData.push(command.data.toJSON());
    client.commands.set(command.data.name, command);
});

/**
 * Loads the events for event handler
 */

readdirSync('./src/events').forEach(async file => {
    console.log('\u001b[' + 32 + 'm' + `[LOADED EVENTS]: ${file}` + '\u001b[0m')

    const event = await require(`./src/events/${file}`);
    if(event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args))
    }
});

/**
 * Any process errors gets logged in terminal not throwed
 */

process.on("unhandledRejection", (error) => {
    console.log(error)
});

process.on("uncaughtException", (error) => {
    console.log(error)
});

process.on("uncaughtExceptionMonitor", (error) => {
    console.log(error)
});

/**
 * Logs in to the bot with the provided token from config.json
 */

client.login(config.token);