const { generateCarnet } = require('../../generateCarnet')
const Discord = require('discord.js')
const { randomColor } = require('randomcolor')

module.exports = {
  name: 'carnet',
  description: 'Tu carnet o el carnet del usuario a quien etiquetes.',
  aliases: ['avatar', 'perfil'],
  usage: '[usuario]',
  module: 'UNAL',
  execute (message) {
    const user = message.mentions.users.first() || message.author
    generateCarnet(user).then((carnet) => {
      const attachment = new Discord.MessageAttachment(carnet, 'carnet.png')
      const carnetEmbed = new Discord.MessageEmbed()
        .setColor(randomColor())
        .setDescription(user.tag)
        .attachFiles(attachment)
        .setImage('attachment://carnet.png')

      message.channel.send(carnetEmbed)
    })
  }
}
