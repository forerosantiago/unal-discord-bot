const Discord = require('discord.js')
const { randomColor } = require('randomcolor')

module.exports = {
  name: 'ping',
  description: 'Latencia del bot y de Discord.',
  aliases: ['latencia'],
  usage: '',
  execute (message, args) {
    const embed = new Discord.MessageEmbed()
    embed
      .setColor(randomColor())
      .addFields(
        {
          name: 'Latencia',
          value: `:ping_pong: ${Date.now() - message.createdTimestamp}ms`,
          inline: true
        },
        {
          name: 'API',
          value: `:desktop:  ${Math.round(message.client.ws.ping)}ms`,
          inline: true
        })
    message.channel.send(embed)
  }
}
