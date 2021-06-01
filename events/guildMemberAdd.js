const { randomColor } = require('randomcolor')

const Discord = require('discord.js')
const db = require('quick.db')
const { generateCarnet } = require('../generateCarnet')

module.exports = {
  name: 'guildMemberAdd',
  once: false,
  execute (member, client) {
    const channelID = db.get(`channel_${member.guild.id}`)
    const channel = client.channels.cache.get(channelID)

    if (!channel) return

    generateCarnet(member.user).then((carnet) => {
      const attachment = new Discord.MessageAttachment(carnet, 'carnet.png')
      const carnetEmbed = new Discord.MessageEmbed()
        .setColor(randomColor())
        .setTitle(`${member.user.tag}`)
        .attachFiles(attachment)
        .setImage('attachment://carnet.png')

      channel.send(`¡Felicidades ${member} has sido admitido/a!`)
      channel.send(carnetEmbed)
    })
  }
}
