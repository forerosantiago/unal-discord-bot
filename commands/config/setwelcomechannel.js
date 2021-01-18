const { Command } = require('discord.js-commando');
const db = require("quick.db")

module.exports = class SetWelcomeChannelCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'setwelcomechannel',
			group: 'config',
			memberName: 'setwelcomechannel',
			description: 'Configura el canal de entradas.',
            userPermissions: ['ADMINISTRATOR'],
		});
	}

	async run(message) {
        let channel = message.mentions.channels.first()
    
        if(!channel) return message.channel.send("Intente nuevamente")
    
    
        db.set(`welcomeChannel_${message.guild.id}`, channel.id)
    
        message.say(`${message.author}, el nuevo canal de entradas es ${channel} :thumbsup:`);
    }
};