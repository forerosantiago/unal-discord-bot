const { Command } = require('discord.js-commando');

module.exports = class SetWelcomeCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'leave',
			group: 'config',
			memberName: 'leave',
			description: 'Simulate member leave.',
            ownerOnly: true,
		});
	}

	async run(message) {
        message.react("👌");
        this.client.emit('guildMemberRemove', message.member);
    }
};