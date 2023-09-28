const { SlashCommandBuilder } =  require ("discord.js")

module.exports = {
   data: new SlashCommandBuilder()
        .setName("biscoitar")
        .setDescription("Para quem você gostaria de mandar um biscoito?")
        .addStringOption(option => option.setName("input")
            .setDescription("Mencione a pessoa usando o '@' para dar um biscoito.")
            .setRequired(true)
    ),
    
    async execute(interaction) {
        const input = interaction.options.getString("input");
        console.log("input: ", input)

        if (!input) {
            await interaction.reply("Por favor, forneça um nome para biscoitar! exemplo: @Nome")
            return;
        }
        await interaction.channel.send(`${input} ganhou um biscoito!`);
    }
}