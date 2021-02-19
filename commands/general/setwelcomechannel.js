const db = require("quick.db");

module.exports = {
    name: 'setwelcomechannel',
    description: 'Configura el canal para el registro de bienvenidas',
    //aliases: [],
    usage: '<#canal>',
    permissions: ['ADMINISTRATOR'],
    execute(message){
        let channel = message.mentions.channels.first();

        if (!channel) return message.channel.send("Intenta nuevamente");

        db.set(`welcomeChannel_${message.guild.id}`, channel.id);

        message.channel.send(`${message.author}, el nuevo canal de entradas es ${channel} :thumbsup:`);
    }
}