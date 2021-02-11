const fs = require('fs');
require('dotenv').config();
const Discord = require('discord.js');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

fs.readdir('./events/', (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        const eventFunction = require(`./events/${file}`);
        if (eventFunction.disabled) return;

        const event = eventFunction.event || file.split('.')[0];
        const emitter = (typeof eventFunction.emitter === 'string' ? client[eventFunction.emitter] : eventFunction.emitter) || client;
        const once = eventFunction.once;

        try {
            emitter[once ? 'once' : 'on'](event, (...args) => eventFunction.run(...args, client));
        } catch (error) {
            console.error(error.stack);
        }
    });
});

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag} (${client.user.id})`);
});

client.on("error", console.error);
client.login(process.env.TOKEN);

require("./keep_alive.js");
