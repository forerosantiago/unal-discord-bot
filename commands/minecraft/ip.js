
const Discord = require('discord.js');
const {randomColor} = require('randomcolor');
const util = require('minecraft-server-util');

module.exports = {
    name: 'ip',
    description: 'IP y versión del servidor',
    aliases: ['estado'],
    usage: '',
    execute(message, args){
        const embed = new Discord.MessageEmbed()
        embed
            .setTitle('UN Minecraft')
            .setColor(randomColor())


        util.status(process.env.IP).then((result) => {
            embed.setDescription(`**IP:** ${process.env.IP}\n**Versión: ** ${result.version.split(' ')[1]}\n**Discord:** https://discord.gg/9NtGSAyDV9\n**Telegram:** https://t.me/unminecraft`)

        })
        .catch((error) => {
            embed.setDescription(`**IP:** ${process.env.IP}\n**Discord:** https://discord.gg/9NtGSAyDV9\n**Telegram:** https://t.me/unminecraft`)
        })
        .then(() => message.channel.send(embed));
    }
}