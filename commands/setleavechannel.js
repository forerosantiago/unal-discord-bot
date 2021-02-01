const Discord = require('discord.js');
const {randomColor} = require('randomcolor');
const db = require("quick.db");

module.exports = {
    name: 'setleavechannel',
    description: 'Configura el canal para el registro de salidas',
    //aliases: [],
    usage: '<#canal>',
    module: 'Configuración',
    permissions: ['ADMINISTRATOR'],
    execute(message){
        let channel = message.mentions.channels.first();

        if (!channel) return message.channel.send("Intenta nuevamente");

        db.set(`leaveChannel_${message.guild.id}`, channel.id);

        message.channel.send(`${message.author}, el nuevo canal de salidas es ${channel} :thumbsup:`);
    }
}