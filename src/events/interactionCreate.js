const { Events, InteractionType } = require("discord.js");
const serverSchema = require('../utils/serverSchema.js');

module.exports = {
    name: Events.InteractionCreate,
    execute: async(interaction) => {
        let client = interaction.client;
        if(interaction.type == InteractionType.ApplicationCommand) {
            if(interaction.user.bot) return;
            try {
                const command = client.commands.get(interaction.commandName);
                console.log(command)
                if(command.disabled == true) return interaction.reply({content: "This command has been disabled", ephemeral: true});
                command.run(client, interaction, serverSchema)
            } catch (e) {
                console.error(e);
                interaction.reply({
                    content: "There has been a problem attempting to run this command.",
                    ephemeral: true
                })
            }
        }
    }
}