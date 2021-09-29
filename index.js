const fs = require('fs')
const { Client, Intents, Collection } = require('discord.js')
const express = require('express')
require('dotenv').config()

const client = new Client({ intents: [Intents.FLAGS.GUILDS] })

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'))

for (const file of eventFiles) {
  const event = require(`./events/${file}`)
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args))
  } else {
    client.on(event.name, (...args) => event.execute(...args))
  }
}

client.commands = new Collection()
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))

for (const file of commandFiles) {
  const command = require(`./commands/${file}`)
  client.commands.set(command.data.name, command)
}

client.login(process.env.TOKEN)

const app = express()
app.get('/', (req, res) => {
  res.send(`Guilds: ${client.guilds.cache.size}, users: ${client.users.cache.size}`)
})

app.listen(process.env.PORT)
