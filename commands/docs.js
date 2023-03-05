const { SlashCommandBuilder, ActionRowBuilder, StringSelectMenuBuilder, Component } = require('discord.js')

const row = new ActionRowBuilder()
    .addComponents(
        new StringSelectMenuBuilder()
            .setCustomId("select")
            .setPlaceholder("Nenhuma Linguagem Selecionada")
            .addOptions(
                {
                    label: "Discord.JS",
                    description: "Veja a documentação do Discord.JS",
                    value:"discordjs"
                },
                {
                    label: "Video Referência",
                    description: "Veja o vídeo que utilizei para fazê-lo",
                    value:"video"
                },
                {
                    label: "GitHub",
                    description: "Veja O GitHub do Projeto: ",
                    value:"github"
                },
            )
    )

module.exports = {
    data: new SlashCommandBuilder()
    .setName('docs')
    .setDescription('Acesse a documentação das documentações que quiser'),

    async execute(interaction) {
    await interaction.reply({content: "Selecione uma das Techs abaixo: ", components: [row] })
}
}