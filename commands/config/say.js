const { Command } = require("discord.js-commando");

module.exports = class SetWelcomeCommand extends Command {
    constructor(client) {
        super(client, {
            name: "say",
            group: "config",
            memberName: "say",
            description: "Repite un mensaje.",
            userPermissions: ['MANAGE_MESSAGES'],
            args: [
                {
                    key: 'text',
                    prompt: '¿Qué le gustaría que el bot dijera?',
                    type: 'string',
                },
            ],
        });
    }

    async run(message , {text}) {
        message.channel.send(text);
    }
};
