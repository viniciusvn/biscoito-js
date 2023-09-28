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
client.on(Events.InteractionCreate, async interecation => {
    if (!interecation.isChatInputCommand()) return;
    const commandName = interecation.commandName;
    const command = interecation.client.commands.get(commandName);

    if (!command) {
        console.error("Comando não encontrado")
        return
    }
    try {
        await command.execute(interecation)
    }
    catch(err) {
        console.error('err: ', err)
        await interecation.reply("Ocorreu um erro ao executar esse comando!")
    }
})



