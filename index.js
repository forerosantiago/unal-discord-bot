const { CommandoClient } = require("discord.js-commando");
const { MessageEmbed, MessageAttachment } = require("discord.js");
const path = require("path");
const randomColor = require("randomcolor");
const db = require("quick.db");

const Carnet = require("./util/carnet");

require("dotenv").config();

const client = new CommandoClient({
  commandPrefix: process.env.PREFIX,
  owner: "718579144564146196",
  invite: "https://discord.gg/J9stY4Ks2T", // support guild
});

client.registry
  .registerDefaultTypes()
  .registerGroups([
    ["util-public", "Comandos Informativos"],
    ["minecraft", "Comandos del servidor de Minecraft"],
    ["unal", "Comandos de la Universidad"],
    ["config", "Comandos de configuración"],
  ])
  .registerDefaultGroups()
  .registerDefaultCommands({
    ping: false,
    prefix: false,
    unknownCommand: false,
  })
  .registerCommandsIn(path.join(__dirname, "commands"));

client.on("guildMemberAdd", async (member) => {
  const channel_id = db.get(`welcomeChannel_${member.guild.id}`);
  const channel = client.channels.cache.get(channel_id);

  if (!channel) return;

  Carnet.generateCarnet(member.user).then((carnet) => {
    const attachment = new MessageAttachment(carnet, "carnet.png");
    const carnetEmbed = new MessageEmbed()
      .setColor(randomColor())
      .setTitle(`${member.user.tag}`)
      .attachFiles(attachment)
      .setImage("attachment://carnet.png");

    channel.send(`Felicidades ${member} has sido admitid@`);
    channel.send(carnetEmbed);
  });
});

client.on("guildMemberRemove", async (member) => {
  const channel_id = db.get(`leaveChannel_${member.guild.id}`);
  const channel = client.channels.cache.get(channel_id);

  if (!channel) return;
  const leaveEmbed = new MessageEmbed()
    .setDescription(`\`${member.user.tag}\` nos ha dejado :broken_heart:`)
    .setColor(randomColor());

  channel.send(leaveEmbed);
});

client.once("ready", () => {
  console.log(`Logged in as ${client.user.tag} (${client.user.id})`);
});

client.on("error", console.error);
client.login(process.env.TOKEN);
