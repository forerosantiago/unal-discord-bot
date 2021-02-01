const Discord = require('discord.js');
const {randomColor} = require('randomcolor');

const { generateCarnet } = require("../generateCarnet");

const db = require("quick.db");

module.exports = {
    event: "guildMemberAdd",
    once: false,
    run(member, client) {
        const channel_id = db.get(`welcomeChannel_${member.guild.id}`);
        const channel = client.channels.cache.get(channel_id);
  
        if (!channel) return;
        
        generateCarnet(member.user).then((carnet) => {
            const attachment = new Discord.MessageAttachment(carnet, "carnet.png");
            const carnetEmbed = new Discord.MessageEmbed()
                .setColor(randomColor())
                .setTitle(`${member.user.tag}`)
                .attachFiles(attachment)
                .setImage("attachment://carnet.png");
        
            channel.send(`Felicidades ${member} has sido admitid@`);
            channel.send(carnetEmbed);
        });
    }
};
    
