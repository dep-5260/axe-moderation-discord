const { EmbedBuilder, PermissionsBitField } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Send Pong"),
    disabled: false,
    run: async (client, interaction) => {
        console.log(interaction)
        const sent = await interaction.reply({ content: 'Pinging...', fetchReply: true });
        interaction.editReply(`Roundtrip latency: ${sent.createdTimestamp - interaction.createdTimestamp}ms\nWebsocket heartbeat: ${client.ws.ping}ms`);
    }
}