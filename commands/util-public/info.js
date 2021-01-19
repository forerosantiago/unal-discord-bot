const { Command } = require("discord.js-commando");
const { MessageEmbed } = require("discord.js");
const prettyMilliseconds = require('pretty-ms');

var randomColor = require("randomcolor");

module.exports = class PingCommand extends Command {
    constructor(client) {
        super(client, {
            name: "info",
            group: "util-public",
            memberName: "info",
            description: "Información del bot.",
        });
    }

    async run(message) {
        const infoEmbed = new MessageEmbed()
            .setColor(randomColor.randomColor())
            .setTitle("UNAL BOT")
            .setDescription("Bot de Discord de la Universidad Nacional de Colombia")
            .addFields(
                { name: "Tiempo de Actividad", value: prettyMilliseconds(this.client.uptime) },
                { name: "Servidores", value: this.client.guilds.cache.size },
                { name: "Usuarios", value: this.client.users.cache.size },
                { name: "Memoria", value: (process.memoryUsage().heapUsed / 1048576).toFixed(2) + "MB" },
                { name: "Link de Invitación", value: "https://discord.com/api/oauth2/authorize?client_id=780526166561521716&permissions=8&scope=bot"},
                { name: "Código Fuente", value: "https://github.com/forerosantiago/unal-discord" },
            )
        message.embed(infoEmbed)

    }
};
