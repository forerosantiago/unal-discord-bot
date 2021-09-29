const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed, MessageAttachment } = require('discord.js')
const { generateCarnet } = require('../util/generateCarnet')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('carnet')
    .setDescription('Carnet')
    .addUserOption(option => option.setName('target').setDescription('Usuario')),

  async execute (interaction) {
    const user = interaction.options.getUser('target') || interaction.member.user

    generateCarnet(user).then((carnet) => {
      const attachment = new MessageAttachment(carnet, 'carnet.png')
      const embed = new MessageEmbed()
        .setColor('#8eb826')
        .setTitle(`Carnet de ${user.username}`)
        .setImage('attachment://carnet.png')
      return interaction.reply({ embeds: [embed], files: [attachment] })
    })
  }
}
