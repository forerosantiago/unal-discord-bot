const { Command } = require('discord.js-commando');
const db = require("quick.db")

module.exports = class SetLeaveChannelCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'setleavechannel',
			group: 'config',
			memberName: 'setleavechannel',
			description: 'Configura el canal de salidas.',
            userPermissions: ['ADMINISTRATOR'],
		});
	}

	async run(message) {
        let channel = message.mentions.channels.first()
    
        if(!channel) return message.channel.send("Intente nuevamente")
    
    
        db.set(`leaveChannel_${message.guild.id}`, channel.id)
    
        message.say(`${message.author}, el nuevo canal de salidas es ${channel} :thumbsup:`);
    }
};