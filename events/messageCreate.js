const fs = require('fs')

module.exports = {
  name: 'messageCreate',
  once: false,
  execute (message, client) {
    if (!message.content.startsWith(process.env.PREFIX) || message.author.bot) return

    const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/)
    const command = args.shift().toLowerCase()

    if (!client.messageCommands.has(command)) return

    try {
      client.messageCommands.get(command).execute(message, args)
    } catch (error) {
      console.error(error)
      message.reply('error')
    }
  }
}
