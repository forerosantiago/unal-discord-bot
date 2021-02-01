const db = require("quick.db");

module.exports = {
    event: "guildMemberRemove",
    once: false,
    run(member, client) {
        const channel_id = db.get(`leaveChannel_${member.guild.id}`);
        const channel = client.channels.cache.get(channel_id);
      
        if (!channel) return;
        const leaveEmbed = new MessageEmbed()
          .setDescription(`\`${member.user.tag}\` nos ha dejado :broken_heart:`)
          .setColor(randomColor());
      
        channel.send(leaveEmbed);
    }
};
    


