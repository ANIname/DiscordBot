'use strict';

const forEach = require('foreach');
const filter = require('array-filter');
const importDIr = require('directory-import');
const client = require('../client');

const commands = importDIr('./commands', 'async');

async function commandExecution(message) {
  const args = message.content.split(' ');
  const command = args[0].slice(1);

  if (commands[command]) {
    await message.delete();

    return commands[command](message, args);
  }
}

async function sendInviteForUser(message, membersIds) {
  await message.delete();

  membersIds = filter(membersIds, id => {
    const user = client.users.get(id);

    return !user.bot && message.author.id !== id;
  });

  if (!membersIds.length) return;

  let contentForAuthor = 'Я удалила ваше сообщение, чтобы не засорять чат. Однако я понимаю, что вы хотите обратить внимение, ';
  let contentForMembers = `<@${message.member.id}> Хочет видеть вас`;

  if (membersIds.length === 1) {
    contentForAuthor += `<@${membersIds[0]}>, поэтому я отправила ему(ей) приглашение`
  } else {
    forEach(membersIds, id => {
      contentForAuthor += `<@${id}> и `
    });

    contentForAuthor = contentForAuthor.slice(0, -3);
    contentForAuthor += ', поэтому я отправила им приглашение'
  }

  if (message.member.voiceChannelID) {
    contentForAuthor += ' к вам в голосовой канал!';
    contentForMembers += ` в голосовом канале: ${client.channels.get(message.member.voiceChannelID).name}!`
  } else {
    contentForAuthor += '.';
    contentForMembers += ` в текстовом канале : <#${message.channel.id}>`;
  }

  forEach(membersIds, id => {
    client.users.get(id).send(contentForMembers);
  });

  const messageForAuthor = await message.author.send(contentForAuthor);

  const DELAY = 30000;

  messageForAuthor.delete(DELAY);
}

function checkExistenceContent(membersMentions) {
  const WHITESPACE_LENGTH = 1;
  const MENTION_WITHOUT_ID_LENGTH = 3;
  const membersIds = [];
  let length = 0;

  forEach(membersMentions, member => {
    length += member.id.length + WHITESPACE_LENGTH + MENTION_WITHOUT_ID_LENGTH;

    membersIds.push(member.id);
  });

  return message.content.length <= length;
}

module.exports = {commandExecution, sendInviteForUser, checkExistenceContent}