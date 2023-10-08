const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("biscoitar")
    .setDescription("Mencione as pessoas a quem você gostaria de dar um biscoito e inclua uma mensagem personalizada.")
    .addStringOption(option => option
      .setName("people")
      .setDescription("Mencione as pessoas usando o '@'. Separe as menções por espaços.")
      .setRequired(true))
    .addStringOption(option => option
      .setName("message")
      .setDescription("Inclua uma mensagem personalizada para acompanhar o biscoito.")
    ),

  async execute(interaction) {
    const people = interaction.options.getString("people"); // Obtém as menções de pessoas inserida pelo usuário
    const message = interaction.options.getString("message");  // Obtém a mensagem incluida pelo usuário
    const author = interaction.user.username; // Obtém o nome do autor da interação

    if (!people) {
      await interaction.reply("Por favor, mencione as pessoas que devem receber o biscoito.");
      return;
    }

    const pessoasMentioned = people.split(" ");
    const mentions = [];

    for (const people of pessoasMentioned) { // for para separar as menções caso tenha mais de um
        mentions.push(`<${people}>`);
    }

    const mensagemBiscoito = message ? `\n${message}` : "";

    await interaction.channel.send(`${author} entregou um biscoito para ${mentions.join(" ")} ${mensagemBiscoito}`);
  },
};
