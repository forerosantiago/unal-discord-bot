const { Command } = require("discord.js-commando");
const Discord = require("discord.js");
const util = require("minecraft-server-util");

module.exports = class StatusCommand extends Command {
  constructor(client) {
    super(client, {
      name: "status",
      group: "minecraft",
      memberName: "status",
      description: "Estado del servidor.",
    });
  }

  run(message) {
    const statusEmbed = new Discord.MessageEmbed();

    util
      .status(process.env.IP)
      .then((response) => {
        statusEmbed.setColor("#2ECC40").addFields(
          { name: "Estado", value: "ON", inline: true },
          {
            name: "Personas online",
            value: `${response.onlinePlayers} / ${response.maxPlayers}`,
            inline: true,
          }
        );

        let players = ""; // string with a portion of online players
        if (response.samplePlayers != null) {
          for (let i = 0; i < response.samplePlayers.length; i++) {
            players += response.samplePlayers[i].name + " ";
          }
        } else {
          players = "Nadie"; // nobody
        }

        if (response.onlinePlayers - response.samplePlayers.length == 0) {
          statusEmbed.addField("Jugadores", players);
        } else {
          statusEmbed.addField(
            "Jugadores",
            `${players}y ${
              response.onlinePlayers - response.samplePlayers.length
            } más`
          );
        }
      })
      .catch((error) => {
        // when server is off
        statusEmbed
          .setColor("#FF4136")
          .addFields(
            { name: "Estado", value: "OFF", inline: true },
            { name: "Personas online", value: `- / -`, inline: true }
          );
      })
      .then(function () {
        statusEmbed
          .setTitle(process.env.IP)
          .setThumbnail(
            "https://media.discordapp.net/attachments/784106675976011787/800433670980108328/logotipo_unal.png"
          )
          .setFooter(message.member.displayName, message.author.avatarURL());

        message.embed(statusEmbed);
      });
  }
};
