'use strict';

const Discord = require('discord.js');
const client = require('../client');

const messageContent = new Discord.RichEmbed()
  .setTitle('Письмо с подтверждением!')
  .setDescription(
    'Привет! Я рада вас видеть в нашей гильдии, однако прежде чем я открою для вас каналы - ' +
    'вы должны согласиться с нашими правилами. Их не много, однако они очень важны!\n\n' +
    'https://book.aniname.com/discord \n\n' +
    'После прочтения подтвердите это, нажав на кнопку: "✅", под этим сообщением'
  );

client.on('guildMemberAdd', async member => {
  try {
    const message = await member.send(messageContent);

    return message.react('✅');
  } catch (error) {
    throw console.error(error);
  }
});
