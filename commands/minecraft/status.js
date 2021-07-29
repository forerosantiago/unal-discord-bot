const Discord = require('discord.js')
const util = require('minecraft-server-util')

module.exports = {
  name: 'status',
  description: 'Estado del servidor',
  execute (message) {
    util.status(process.env.ip)
      .then((response) => {
        let players = ''
        if (response.onlinePlayers === 0) {
          players = 'Nadie.'
        } else {
          response.samplePlayers.forEach(player => { players += player.name + ' ' })
        }

        const embed = new Discord.MessageEmbed()
          .setColor('#2ecc40')
          .setTitle('UN Minecraft')

          .setDescription('Servidor de Minecraft de la Universidad Nacional de Colombia. Ping: ' + response.roundTripLatency)
          .addFields(
            { name: 'Personas en línea', value: response.onlinePlayers + ' / ' + response.maxPlayers, inline: true },
            { name: 'Jugadores', value: '``' + players + '``', inline: true }

          )

          .setTimestamp()
          .setFooter(message.member.displayName, message.author.avatarURL())
        message.channel.send(embed)
      })
      .catch((error) => {
        message.channel.send('Server Offline, <@&773750073003737088> prendan el server <a:polish_cow:847834176749305897>')
        console.log(error)
      })
  }
}
