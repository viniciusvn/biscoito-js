const { SlashCommandBuilder } =  require ("discord.js")

module.exports = {
   data: new SlashCommandBuilder()
        .setName("secreto")
        .setDescription("Para quem você gostaria de mandar um biscoito?")
        .addStringOption(option => option.setName("people")
            .setDescription("Mencione a pessoa usando o '@' para dar um biscoito.")
            .setRequired(true)
    ),
    
    async execute(interaction) {
        const people = interaction.options.getString("people");
        console.log("input: ", people)

        if (!people) {
            await interaction.reply("Por favor, forneça um nome para biscoitar! exemplo: @Nome")
            return;
        }
        await interaction.channel.send(`<${people}> ganhou um biscoito!`);
    }
}