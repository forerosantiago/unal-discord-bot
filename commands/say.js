module.exports = {
    name: 'say',
    description: 'Repite un mensaje dado',
    aliases: ['decir'],
    usage: '',
    module: 'Misc',
    permissions: 'MANAGE_MESSAGES',

    execute(message){
        message.channel.send(message.content.split(' ').slice(1).join(' '))
    }
}