
module.exports = {
  name: 'edit',
  description: 'Edita un mensaje enviado por el bot',
  aliases: ['editar'],
  usage: '',
  permissions: 'MANAGE_MESSAGES',

  execute (message, args) {
    const id = args[0]
    args.splice(0, 1)

    message.channel.messages.fetch({ around: id, limit: 1 })
      .then(msg => {
        message.delete({ timeout: 3 })
        const fetchedMsg = msg.first()
        fetchedMsg.edit(args.join(' '))
      })
      .catch(() => message.channel.send('Hubo un problema, asegúrate de que tenga permisos suficientes y de que me pasaste el id correcto.'))
  }
}
