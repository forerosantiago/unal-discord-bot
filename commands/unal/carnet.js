const { Command } = require("discord.js-commando");
const { MessageEmbed, MessageAttachment } = require("discord.js");

const randomColor = require("randomcolor");

const Carnet = require("../../util/carnet");

module.exports = class CarnetCommand extends Command {
  constructor(client) {
    super(client, {
      name: "carnet",
      group: "unal",
      memberName: "carnet",
      description: "Muestra el carnet tuyo o del usuario mencionado.",
    });
  }

  async run(message) {
    const user = message.mentions.users.first() || message.author;

    Carnet.generateCarnet(user).then((carnet) => {
      const attachment = new MessageAttachment(carnet, "carnet.png");
      const carnetEmbed = new MessageEmbed()
        .setColor(randomColor())
        .setDescription(`Aquí está el carnet de **${user.tag}**`)
        .attachFiles(attachment)
        .setImage("attachment://carnet.png");

      message.embed(carnetEmbed);
    });
  }
};
