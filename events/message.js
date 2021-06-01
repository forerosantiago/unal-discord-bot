const prefix = process.env.prefix
const escapeRegex = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

module.exports = {
  name: 'message',
  execute (message) {
    const prefixRegex = new RegExp(`^(<@!?${message.client.user.id}>|${escapeRegex(prefix)})\\s*`)
    if (!prefixRegex.test(message.content)) return

    const [, matchedPrefix] = message.content.match(prefixRegex)
    const args = message.content.slice(matchedPrefix.length).trim().split(/ +/)

    const commandName = args.shift().toLowerCase()

    const command = message.client.commands.get(commandName) ||
message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))

    if (!command) return

    if (command.guildOnly && message.channel.type === 'dm') {
      return message.reply('I can\'t execute that command inside DMs!')
    }

    if (command.permissions) {
      const authorPerms = message.channel.permissionsFor(message.author)
      if (!authorPerms || !authorPerms.has(command.permissions)) {
        if (message.author.id !== process.env.owner) return message.reply('You can not do this!')
      }
    }

    if (command.args && !args.length) {
      let reply = `You didn't provide any arguments, ${message.author}!`

      if (command.usage) {
        reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``
      }

      return message.channel.send(reply)
    }

    try {
      command.execute(message, args)
    } catch (error) {
      console.error(error)
      message.reply('there was an error trying to execute that command!')
    }
  }
}
