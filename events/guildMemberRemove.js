const { randomColor } = require('randomcolor')
const Discord = require('discord.js')
const db = require('quick.db')

module.exports = {
  name: 'guildMemberRemove',
  once: false,
  execute (member, client) {
    const channelID = db.get(`channel_${member.guild.id}`)
    const channel = client.channels.cache.get(channelID)

    if (!channel) return
    const leaveEmbed = new Discord.MessageEmbed()
      .setDescription(`\`${member.user.tag}\` nos ha dejado (<:ponal:849265264091988008> es tombo)`)
      .setColor(randomColor())

    channel.send(leaveEmbed)
  }
}
