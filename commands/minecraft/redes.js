
const Discord = require('discord.js');
const {randomColor} = require('randomcolor');
const util = require('minecraft-server-util');

module.exports = {
    name: 'redes',
    description: 'IP y versión del servidor',
    aliases: ['social', 'instagram', 'telegram', 'youtube'],
    usage: '',
    execute(message, args){
        const embed = new Discord.MessageEmbed()
        embed
            .setTitle('Redes Sociales')
            .setColor(randomColor())
            .setDescription(`<:instagram:812447736078663720> [Instagram](instagram.com/minecraft_un/)\n <:telegram:812447684132339733> [Telegram](https://t.me/unminecraft)\n <:discord:812448001275592714> [Discord](https://discord.gg/9NtGSAyDV9)`)
        

        message.channel.send(embed);
    }
}