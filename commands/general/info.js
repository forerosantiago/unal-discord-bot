const Discord = require('discord.js');
const prettyMilliseconds = require('pretty-ms')
const {randomColor} = require('randomcolor');

module.exports = {
    name: 'info',
    description: 'Detalles técnicos del bot',
    aliases: ['informacion'],
    usage: '',
    module: 'General',
    execute(message, args){
        const embed = new Discord.MessageEmbed()
            .setColor(randomColor())
            .setTitle('UNAL')
            .setDescription('Bot de Discord de la Universidad Nacional de Colombia.\n[Votar en top.gg](https://top.gg/bot/780526166561521716/vote)\n[Votar en DBL](https://discordbotlist.com/bots/unal/upvote)')
            .addFields(
                { name: 'Servidores', value: message.client.guilds.cache.size, inline: true},
                { name: 'Usuarios', value: message.client.users.cache.size, inline: true},
                { name: 'Tiempo de Actividad', value: prettyMilliseconds(message.client.uptime), inline: true },
                { name: 'Memoria', value: `${Math.round(process.memoryUsage().heapTotal / 1024 / 1024)} MB`, inline: true },

                { name: 'Soporte', value: "[Servidor de soporte](https://discord.gg/J9stY4Ks2T)."},
                { name: 'Invitación', value: "[Link de invitación](https://discord.com/api/oauth2/authorize?client_id=781665488936763413&permissions=453696&scope=bot)."},
            )

        message.channel.send(embed)
    }
}