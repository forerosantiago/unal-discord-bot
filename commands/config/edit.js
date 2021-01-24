const { Command } = require("discord.js-commando");

module.exports = class SetWelcomeCommand extends Command {
    constructor(client) {
        super(client, {
            name: "edit",
            group: "config",
            memberName: "edit",
            description: "Edita un mensaje enviado por el bot.",
            userPermissions: ['MANAGE_MESSAGES'],
            args: [
                {
                    key: 'id',
                    prompt: '¿Cuál es el **ID** del mensaje que quiere editar?',
                    type: 'string',
                },
                {
                    key: 'text',
                    prompt: '¿Cuál es el nuevo contenido del mensaje?',
                    type: 'string',
                },
            ],
        });
    }

    async run(message, { id, text }) {
        message.channel.messages.fetch(id)
        .then(msg => { 
            if(msg.author.id != this.client.user.id) return message.reply("no puedo editar un mensaje que no es de mi autoría.")
            msg.edit(text);
        })
        .catch(err => {
            message.reply("un error ha ocurrido, no puedo encontrar ese mensaje.")
        });
    }
};
