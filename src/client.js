const Discord = require('discord.js');

const { DISCORD_BOT_TOKEN } = process.env;

const client = new Discord.Client();

client
  .login(DISCORD_BOT_TOKEN)
  .catch(console.error);

module.exports = client;