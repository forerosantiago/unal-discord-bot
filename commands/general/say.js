module.exports = {
  name: 'say',
  description: 'Repite un mensaje dado',
  aliases: ['decir'],
  usage: '',
  permissions: 'MANAGE_MESSAGES',

  execute (message) {
    message.delete({ timeout: 3 })
    message.channel.send(message.content.split(' ').slice(1).join(' '))
  }
}
