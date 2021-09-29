const axios = require('axios');

const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('python')
    .setDescription('Evalua código de python.')
    .addStringOption(option => option.setName('code').setDescription('Código a evaluar.').setRequired(true)),
  async execute (interaction) {

    const input = interaction.options.getString('code')


    const embed = new MessageEmbed()
      .setColor('#ffd343;')
      .setTitle('Python')
      .setTimestamp()


    axios.get('http://dotpy3.herokuapp.com?' + input)
    .then(function (response) {
        embed.addFields(
            { name: 'Código', value: '```py\n ' + input + '\n```' },
        { name: '\u200B', value: '\u200B' },
        { name: 'Salida', value: '```py\n ' + response.data + '\n```' },
        )
    })
    .catch(function (error) {
      embed.setDescription('Hubo un error :warning:')
      console.log(error);
    })
    .then(function () {
        return interaction.reply({embeds: [embed]})
    });

  }
}
