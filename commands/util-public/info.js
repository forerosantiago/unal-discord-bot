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
            .addFields(
                { name: "Tiempo de actividad", value: prettyMilliseconds(this.client.uptime) },
                { name: "Servidores", value: this.client.guilds.cache.size },
                { name: "Usuarios", value: this.client.users.cache.size },
                { name: "Memoria", value: (process.memoryUsage().heapUsed / 1048576).toFixed(2) + "MB" },

            )
        message.embed(infoEmbed)

    }
};
