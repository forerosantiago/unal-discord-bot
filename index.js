const fs = require('fs');
const Discord = require('discord.js');
const { generateCarnet } = require('./generateCarnet');

require('dotenv').config();


const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFolders = fs.readdirSync('./commands');

client.games = new Discord.Collection();


for (const folder of commandFolders) {
	const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/${folder}/${file}`);
		client.commands.set(command.name, command);
	}
}

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag} (${client.user.id})`);
});


client.on('message', message => {
	console.log(message.content)

    const prefixes = [process.env.PREFIX, `<@${client.user.id}>`, `<@!${client.user.id}> `];

    const prefix = prefixes.find(p => message.content.startsWith(p));

    if (!prefix || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;


    const embed = new Discord.MessageEmbed().setColor('#FF4136');

	if (command.guildOnly && message.channel.type === 'dm') {
        embed.setDescription(':warning: ¡No puedo hacer eso en los DM! :warning:')
		return message.channel.send(embed);
	}

	if (command.permissions) {
		const authorPerms = message.channel.permissionsFor(message.author);
		if (!authorPerms || !authorPerms.has(command.permissions)) {
            embed.setDescription(':warning: ¡No tienes permisos para hacer eso! :warning:')
		    return message.channel.send(embed);
		}
	}

	if (command.args && !args.length) {
        embed.setDescription('¡No proporcionaste argumentos!')
        if (command.usage) embed.addField('Uso', process.env.prefix + command.name + command.usage);
        
        message.channel.send(embed);
	}

	try {
		command.execute(message, args);
	} catch (error) {
		console.error(error);
        embed.setDescription(':x: ¡Hubo un error ejecutando ese comando! :x:')
	}
});

client.on('guildMemberAdd', member => {
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
		})
});

client.on('guildMemberRemove', member => {
	const channel_id = db.get(`leaveChannel_${member.guild.id}`);
	const channel = client.channels.cache.get(channel_id);
  
	if (!channel) return;
	const leaveEmbed = new Discord.MessageEmbed()
	  .setDescription(`\`${member.user.tag}\` nos ha dejado :broken_heart:`)
	  .setColor(randomColor());
  
	channel.send(leaveEmbed);
});

client.login(process.env.TOKEN);