const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("price")
        .setDescription("token price")
        .addStringOption(option =>
            option
            .setName('id')
            .setDescription('token id')
            .setRequired(true)
        )
    }