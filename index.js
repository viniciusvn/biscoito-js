const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');

// dotenv
const dotenv = require ('dotenv')
dotenv.config()
const { TOKEN_BOT } = process.env

//Commands import
const fs = require("node:fs")
const path = require("node:path")
const commandsPath = path.join(__dirname, "commands")
const commandsFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"))

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection()

for (const file of commandsFiles) {
    const filePath = path.join(commandsPath, file)
    const command = require(filePath)
    if ("data" in command && "execute" in command) {
        client.commands.set(command.data.name, command)
    } else {
        console.log(`Esse comando em  ${filePath} está com "data" ou "execute" ausente`)
    }
}


//Login do bot
client.once(Events.ClientReady, c => {
	console.log(`Pronto! Login realizado como ${c.user.tag}`);
});

client.login(TOKEN_BOT);

//Listener
client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;
    const commandName = interaction.commandName;
    const command = interaction.client.commands.get(commandName);

    if (!command) {
        console.error("Comando não encontrado")
        return
    }
    try {
        if (commandName === 'biscoitar') {
            const people = interaction.options.getString('people');
            console.log('pessoas e mensagem: ', people)

            if (!people) {
                await interaction.reply("Por favor, mencione a pessoa ou pessoas que devem receber o biscoito.");
                return;
              }
            const userId = people.match(/\d+/);
            
            if (userId && userId[0] === interaction.user.id) {
                // Caso seja uma menção e a ID do usuário mencionado seja a mesma que a do autor da interação
                await interaction.reply("Você não pode enviar um biscoito para si mesmo!");
                return;
              }
              
              if (people.toLowerCase() === interaction.user.username) {
                // Caso seja uma string direta e seja igual ao nome de usuário do autor da interação
                await interaction.reply("Você não pode enviar um biscoito para si mesmo!");
                return;
              }
              
          }

        await command.execute(interaction)
    }
    catch(err) {
        console.error('err: ', err)
        await interaction.reply("Ocorreu um erro ao executar esse comando!")
    }
})



