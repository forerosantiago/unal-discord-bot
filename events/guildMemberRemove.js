const db = require('quick.db')
const { MessageEmbed } = require('discord.js')

module.exports = {
  name: 'guildMemberRemove',
  once: false,
  execute (member, client) {
    if (!db.get(`guild_${member.guild.id}`).porteria) return
    const embed = new MessageEmbed()
      .setColor('#a61c31')
      .setDescription(`**${member.user.tag}** se ha ido del servidor.`)
      .setTimestamp()
      .setFooter(member.id)

    client.channels.cache.get(db.get(`guild_${member.guild.id}`).porteria).send({ embeds: [embed] }).catch(err => {
      console.log(err)
    })
  }
}
