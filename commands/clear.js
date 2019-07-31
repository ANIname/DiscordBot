'use strict';

const Discord = require('discord.js');
const Log = require('../modules/Logger');

const richEmbed = new Discord.RichEmbed();

module.exports = async (message, args) => {
  if (message.channel.type !== 'text') {
    return message.author.send('В этом канале я не смогу почистить сообщения');
  }

  if (!message.member.hasPermission('ADMINISTRATOR')) {
    return message.author.send('Вы не являетесь администратором в этой гильдии, поэтому я не могу выполнить эту команду для вас!');
  }

  const [, amount] = args;

  if (isNaN(amount)) {
    return message.author.send(`Я ожидала, что вы укажете сколько сообщений должна быть удалено, однако получила: ${amount}`);
  }

  try {
    await message.channel.bulkDelete(amount);
  } catch (error) {
    richEmbed
      .setTitle(error.message)
      .setDescription(error.stack)
      .setTimestamp()
      .setFooter('Method: member.addRole', client.user.avatarURL);

    return new Log('error', richEmbed);
  }
};