const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js')
const util = require('minecraft-server-util')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('status')
    .setDescription('Estado del servidor de minecraft'),
  async execute (interaction) {
    const embed = new MessageEmbed()
      .setTitle('UN Minecraft')
      .setDescription('Servidor de Minecraft de la Universidad Nacional de Colombia.')
      .setTimestamp()
      .setFooter(interaction.member.displayName)

    util.status('uncraft.crafted.pro')
      .then((response) => {
        let players = ''
        if (response.onlinePlayers === 0) {
          players = 'Nadie.'
        } else {
          response.samplePlayers.forEach(player => { players += player.name + ' ' })
        }

        embed.setColor('#8eb826')
        embed.addFields(
          { name: 'Personas en línea', value: response.onlinePlayers + ' / ' + response.maxPlayers, inline: true },
          { name: 'Jugadores', value: '``' + players + '``', inline: true }
        )
        interaction.reply({ embeds: [embed] })

      })

      .catch((error) => {
        embed.setDescription('Servidor offline.')
        embed.setColor('#a61c31')
        interaction.reply({ embeds: [embed] })
      })

  }
}
