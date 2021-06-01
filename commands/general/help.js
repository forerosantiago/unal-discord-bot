const { MessageEmbed } = require('discord.js')
const { randomColor } = require('randomcolor')

module.exports = {
  name: 'help',
  description: 'List all of my commands or info about a specific command.',
  aliases: ['commands'],
  usage: '[command name]',
  execute (message, args) {
    const embed = new MessageEmbed()
      .setColor(randomColor())

    const { commands } = message.client

    if (!args.length) {
      embed.setTitle('Lista de Comandos')
      embed.setDescription(`Mi prefijo es \`${process.env.prefix}\`, este es un listado con todos mis comandos:\n \`\`${commands.map(command => command.name).join('\n')}\`\`\n\nTambién puedes etiquetarme en vez de usar el prefijo. \nPuedes enviar \`${process.env.prefix}help [comando]\` para obtener información acerca de un comando en especifico.\n¡Entra al [servidor de soporte](https://discord.gg/J9stY4Ks2T)!`)
      return message.channel.send(embed)
    }

    const name = args[0].toLowerCase()
    const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name))

    embed.setTitle('UNAL')

    if (!command) {
      return message.reply('Ese comando no existe! :warning:')
    }

    if (command.name) embed.addField('**Nombre**', command.name)
    if (command.aliases) embed.addField('**Aliases**', command.aliases)
    if (command.aliases) embed.addField('**Descripción**', command.description)
    if (command.usage) embed.addField('**Uso**', `${process.env.PREFIX}${command.name} ${command.usage}`)

    message.channel.send(embed)
  }
}
