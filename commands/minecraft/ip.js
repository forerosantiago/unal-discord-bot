const Discord = require('discord.js')
const { randomColor } = require('randomcolor')
const util = require('minecraft-server-util')

module.exports = {
  name: 'ip',
  description: 'IP y versión del servidor',
  aliases: ['estado'],
  usage: '',
  execute (message) {
    const embed = new Discord.MessageEmbed()
    embed
      .setTitle('UN Minecraft')
      .setColor(randomColor())

    util.status(process.env.ip).then((result) => {
      embed.setDescription(`**IP:** ${process.env.ip}\n**Versión: ** ${result.version.split(' ')[1]}\n**Discord:** https://discord.gg/9NtGSAyDV9\n**Telegram:** https://t.me/unminecraft`)
    })
      .catch((error) => {
        console.log(error)
        embed.setDescription(`**IP:** ${process.env.ip}`)
      })
      .then(() => message.channel.send(embed))
  }
}
