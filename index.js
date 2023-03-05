// Require the necessary discord.js classes
const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');

// .ENV
const dotenv = require('dotenv')
dotenv.config()
const { TOKEN, CLIENT_ID, GUILD_ID } = process.env

// Importação dos comandos
const fs = require('node:fs')
const path = require('node:path')
const commandsPath = path.join(__dirname, 'commands')
const commandsFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'))



const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection()
for (const file of commandsFiles){
    const filePath = path.join(commandsPath, file)
    const command = require(filePath)
    if ("data" in command && "execute" in command){
        client.commands.set(command.data.name, command)
    }else{
        console.log(`this command ${filePath} , data or execute is empty`)
    }
}


// Login
client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});
client.login(TOKEN);

// Listener de interações com o bot
client.on(Events.InteractionCreate, async interaction =>  {

    if (interaction.isStringSelectMenu()){
        const selected = interaction.values[0]
        if(selected == "discordjs"){
            await interaction.reply("Veja a documentação do Discord.JS: https://discord.js.org/#/docs/discord.js/main/general/welcome")
        }else if(selected == "video"){
            await interaction.reply("Veja o vídeo que utilizei para fazê-lo: https://www.youtube.com/watch?v=zKOf1NGGStE")
        }
        else if(selected == "github"){
            await interaction.reply("Veja O GitHub do Projeto:")
        }
    }
    
    
    if (!interaction.isChatInputCommand()) return
    const command = interaction.client.commands.get(interaction.commandName)
    if(!command){
        console.error("Comando não encontrado")
        return
    }
    try {
        await command.execute(interaction)
    } catch (error ) {
        console.log(error)
        await interaction.reply("Houve um erro")
    }
})
