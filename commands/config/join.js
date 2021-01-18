const { Command } = require("discord.js-commando");

module.exports = class SetWelcomeCommand extends Command {
  constructor(client) {
    super(client, {
      name: "join",
      group: "config",
      memberName: "join",
      description: "Simulate new member.",
      ownerOnly: true,
    });
  }

  async run(message) {
    message.react("👌");
    this.client.emit("guildMemberAdd", message.member);
  }
};
