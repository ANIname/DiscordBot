'use strict';

const client = require('../client');
const Log = require('../modules/Logger');

module.exports = async event => {
  if (event.t === 'MESSAGE_REACTION_ADD' || event.t === 'MESSAGE_REACTION_REMOVE') {
    try {
      const reactionChannel = client.channels.get(event.d.channel_id) || await client.users.get(event.d.user_id).createDM();

      if (reactionChannel.message && reactionChannel.message.has(event.d.message_id)) return;

      const message = await reactionChannel.fetchMessage(event.d.message_id);

      const messageReaction = message.reactions.find(value => value._emoji.name === event.d.emoji.name);

      const user = client.users.get(event.d.user_id);

      if (event.t === 'MESSAGE_REACTION_ADD') {
        client.emit('messageReactionAdd', messageReaction, user);
      } else {
        client.emit('messageReactionRemove', messageReaction, user);
      }
    } catch (error) {
      error.footer = 'File: emitEvent';

      return new Log('error', error);
    }
  }
};
