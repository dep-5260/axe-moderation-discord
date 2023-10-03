const { ActivityType, Events } = require("discord.js")
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v10");
const config = require('../../config.js')

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        const rest = new REST({version: "10"}).setToken(config.token);

        try {
            rest.put(Routes.applicationCommands(client.user.id), {
                body: client.commandsData
            });
            console.log('\u001b[' + 32 + 'm' + `[LOGGED IN]: ${client.user}` + '\u001b[0m')
        } catch (e) {
            console.error(e)
        }
    }
}