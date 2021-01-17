const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js')
var randomColor = require('randomcolor');


module.exports = class PingCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'ping',
			group: 'util-public',
			memberName: 'ping',
			description: 'Ping del bot.',
		});
	}

	async run(message) {
        const pingEmbed = new MessageEmbed()
	        .setColor(randomColor())
	        .setDescription(`**Cargando...**`)
	
        return message.embed(pingEmbed).then((message) => 
            message.edit(pingEmbed
                .setTitle("Resultados")
                .setDescription('')
                .addFields(
	        	    { name: 'Latencia', value: `:ping_pong: ${Date.now() - message.createdTimestamp}ms`, inline: true},
		            { name: 'API', value: `:desktop:  ${Math.round(this.client.ws.ping)}ms`, inline: true}
                )));    
	}
};