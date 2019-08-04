'use strict';

const randomInt = require('../modules/randomInt');
const User = require('../models/User');

let link = `https://www.discordapp.com/channels/`;

module.exports = async message => {
  const {voiceChannelID} = message.member;

  if (!voiceChannelID) {
    return message.author.send('Для того, чтобы начать стрим - вам нужно войти в один из голосовых каналов и снова воспользоваться коммандой!');
  }

  link += `${message.guild.id}/${voiceChannelID}`;

  const messages = [
    `У нас тут великий стример, с ником - ${message.member}. Присоединяйся к трансляции!`,
    `${message.member} начал стримить, мне одной интересно что там?`,
    `Побойтесь бога! ${message.member} начал стрим!`
  ];

  const content = messages[randomInt(0, messages.length)];

  const {
    id: messageId,
    channel: {id: channelId}
  } = await message.channel.send(`${content}\n\n${link}`);

  User.findOneAndUpdate({id: message.author.id}, {streaming: {status: true, channelId, messageId}}).exec();
};
