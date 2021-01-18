const { Command } = require("discord.js-commando");
const { MessageEmbed } = require("discord.js");
const randomColor = require("randomcolor");

module.exports = class IpCommand extends Command {
  constructor(client) {
    super(client, {
      name: "ip",
      group: "minecraft",
      memberName: "ip",
      description: "La ip y versión del servidor.",
    });
  }

  run(message) {
    const ipEmbed = new MessageEmbed()
      .setTitle("UN Minecraft")
      .setColor(randomColor())
      .setDescription(
        `**IP:** ${process.env.IP}\n**Versión:** 1.16.4\n**Discord:** https://discord.gg/9NtGSAyDV9\n**Telegram:** https://t.me/unminecraft`
      );
    message.embed(ipEmbed);
  }
};
