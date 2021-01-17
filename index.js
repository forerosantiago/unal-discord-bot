const { CommandoClient } = require('discord.js-commando');
const path = require('path');

require('dotenv').config();

const client = new CommandoClient({
	commandPrefix: process.env.PREFIX,
    owner: '718579144564146196',
    invite: 'https://discord.gg/J9stY4Ks2T',

});

client.registry.registerDefaultTypes()
                .registerGroups([
                    ['util-public', 'Comandos Informativos'],
                    ['minecraft', 'Comandos del servidor de Minecraft'],
                    ['unal', 'Comandos de la Universidad'],
                    ['config', 'Comandos de configuración'],
                ])
                .registerDefaultGroups()
                .registerDefaultCommands({
	                ping: false,
                    prefix: false,
                    unknownCommand: false

                })
                .registerCommandsIn(path.join(__dirname, 'commands'));

client.once('ready', () => {
	console.log(`Logged in as ${client.user.tag} (${client.user.id})`);
});

client.on('error', console.error);
client.login(process.env.TOKEN);