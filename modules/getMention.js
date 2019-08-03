'use strict';

const client = require('../client');

module.exports = (guildId, memberId) => {
  const member = client.guilds.get(guildId).members.get(memberId);

  return (!member || member.user.username === member.nickname)
    ? `<@${memberId}>`
    : `<@!${memberId}>`
}