const { Permissions } = require('discord.js');
const db = require('quick.db')

module.exports = {
  name: 'porteria',
  description: '',
  execute (message, args) {
    if (message.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) return message.channel.send('No tienes permiso. :warning:')

    try {
      message.channel.send(`El nuevo canal de portería es <#${args[0]}>`)

      db.set(`guild_${message.guild.id}`, { porteria: args[0] })

      message.client.emit('guildMemberAdd', message.member)
      message.client.emit('guildMemberRemove', message.member)
    } catch (error) {
      console.log(error)
      db.set(`guild_${message.guild.id}`, { porteria: null })
      message.channel.send(`Configura el canal donde se registrarán las entradas y salidas del servidor.\nUso: ${process.env.PREFIX}porteria <ID del canal>`)
    }
  }
}
