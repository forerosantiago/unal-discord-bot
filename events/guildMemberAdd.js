const db = require('quick.db')
const { MessageEmbed, MessageAttachment } = require("discord.js")

const { generateCarnet } = require('../util/generateCarnet')

module.exports = {
    name: 'guildMemberAdd',
    once: false,
    execute (member, client) {

      generateCarnet(member.user).then((carnet) => {
        const attachment = new MessageAttachment(carnet, 'carnet.png')
        const embed = new MessageEmbed()
        .setColor('#94B43B')
        .setTitle(member.user.tag)
        //.setDescription(`<@${member.user.id}>`)
        .setImage('attachment://carnet.png')
        .setTimestamp()
        .setFooter(member.id);

        client.channels.cache.get(db.get(`guild_${member.guild.id}`).porteria).send({ content: `<@${member.user.id}>`, embeds: [embed], files: [attachment] });
      })



  
        
      
      
    }
}