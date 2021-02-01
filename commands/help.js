require('dotenv').config();
const Discord = require('discord.js');
const {randomColor} = require('randomcolor');

module.exports = {
	name: 'help',
	description: 'List all of my commands or info about a specific command.',
	aliases: ['commands'],
	usage: '[comando]',
	module: 'General',
	execute(message, args) {
		const { commands } = message.client;
		const modules = [];

		const embed = new Discord.MessageEmbed()
			.setColor(randomColor())
			//.setFooter('Puedes también etiquetarme con @ en lugar del prefijo.')
		
		if (!args.length) {
			let modules = [];
			let module_commands = []

			commands.map(command => modules.push(command.module)); //add the modules to an array
			
			modules = [...new Set(modules)];;
			embed
				.setTitle('UNAL | Lista de Comandos')
				.setDescription(`Mi prefijo es: \`${process.env.PREFIX}\` puedes obtener más información acerca de un commando usando \`${process.env.PREFIX}help <nombre del comando>\`.`)
			
			modules.forEach(module => {
				commands.forEach(command => {
					if(command.module == module) {
						module_commands.push(command.name)
					}
				})

				embed.addField(module, '`' + module_commands.join('\n') + '`', true)
				module_commands = []
			});

			return message.channel.send(embed)
		}

		const name = args[0].toLowerCase();
		const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

		if (!command) {
			return message.reply('Ese comando no existe');
		}

		embed
			.setTitle(`${name} | UNAL`)

		if (command.description) embed.addField('Descripción', command.description, false);
		if (command.aliases) embed.addField('Alias', `\`${command.aliases.join(', ')}\``, true);
		if (command.usage) embed.addField('Uso', `\`${process.env.PREFIX}${command.name} ${command.usage}\``, true);
		

		message.channel.send(embed);
	},
};