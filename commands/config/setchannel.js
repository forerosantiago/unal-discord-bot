const db = require('quick.db')

module.exports = {
  name: 'setchannel',
  description: 'Configura el canal para el registro de bienvenidas',
  // aliases: [],
  usage: '<#canal>',
  permissions: ['MANAGE_CHANNELS'],
  execute (message) {
    const channel = message.mentions.channels.first()

    if (!channel) {
      db.set(`welcomeChannel_${message.guild.id}`, null)
      return message.channel.send('Intenta nuevamente')
    }

    db.set(`channel_${message.guild.id}`, channel.id)

    message.channel.send(`${message.author}, el nuevo canal de para registrar entradas y salidas es ${channel} :thumbsup:`)
  }
}
