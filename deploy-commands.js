const { REST, Routes } = require("discord.js")

// dotenv
const dotenv = require ('dotenv')
dotenv.config()
const { TOKEN_BOT, CLIENT_ID, GUILD_ID } = process.env

//Commands import
const fs = require("node:fs")
const path = require("node:path")
const commandsPath = path.join(__dirname, "commands")
const commandsFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"))

const commands = []

for (const file of commandsFiles) { 
    const command = require(`./commands/${file}`)
    commands.push(command.data.toJSON())
 }

// Instance REST
const rest = new REST({version: "10"}).setToken(TOKEN_BOT);

// Deploy
(async() => {
    try{
        console.log(`Resetando ${commands.length} comandos...`)

        //Put
        const data = await rest.put(
            Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
            {body: commands}
        )
        
        console.log('Comandos registrados com sucesso!')
    }
    catch(err){
        console.error('err: ', err)
    }
})()