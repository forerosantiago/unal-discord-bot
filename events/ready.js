module.exports = {
  name: 'ready',
  once: true,
  execute (client) {
    console.log(`Logged in as ${client.user.tag}`)
    client.user.setActivity('<:ponal:849265264091988008> Dios y patria buenos días', { type: 'PLAYING' })
  }
}
