const { SlashCommandBuilder } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("playlist")
        .setDescription("Ouça a melhor playlist que eu conheço"),

    async execute(interaction) {
        await interaction.reply("https://open.spotify.com/playlist/6jXRdJJsiRqSzO3Nalegnd?si=7d3d5b8e3563406e")
    }
}