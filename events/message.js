module.exports = {
    event: "message",
    once: false,
    run(message) {
        if (!message.content.startsWith(process.env.PREFIX) || message.author.bot) return;

	const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = message.client.commands.get(commandName) || message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;
	message.channel.startTyping();

	if (command.guildOnly && message.channel.type === 'dm') {
		return message.reply('No puedes usar ese comando en los mensajes privados.');
	}

	if (command.permissions) {
		const authorPerms = message.channel.permissionsFor(message.author);
		if (!authorPerms || !authorPerms.has(command.permissions)) {
			return message.reply('No tienes permisos para hacer eso.');
		}
	}

	if (command.args && !args.length) {
		let reply = `${message.author} No proporcionaste ningún argumento`;

		if (command.usage) {
			reply += `\nEl uso correcto sería: \`${process.env.PREFIX}${command.name} ${command.usage}\``;
		}

		return message.channel.send(reply);
	}

	try {
		command.execute(message, args);
		message.channel.stopTyping();
	} catch (error) {
		console.error(error);
		message.reply('Hubo un error ejecutando ese comando.');
	}
    }
};