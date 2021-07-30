const { MessageEmbed } = require('discord.js')
const { randomColor } = require('randomcolor')

module.exports = {
  name: 'suggest',
  description: 'Ideas o sugerencias para el bot.',
  // aliases: [''],
  usage: '<suggestion>',
  execute (message, args) {
    if (!args.length) { return message.reply("No sugeriste nada :warning:") }

    message.reply(
      '¡Gracias por tu sugerencia! :thumbsup:'
    )
    channel = message.client.channels.cache.get(
      process.env.suggestion_channel_id
    )

    const embed = new MessageEmbed()
      .setColor(randomColor())
      .setTitle(`Nueva sugerencia por ${message.author.tag}`)
      .setThumbnail(message.author.displayAvatarURL())
      .setDescription(args.join(' '))
      .addField('En', message.guild)
      .setTimestamp()
      .setFooter(message.author.id)

    channel.send(embed).then((message) => {
      message.react('✔️')
      message.react('❌')
    })
  }
}
