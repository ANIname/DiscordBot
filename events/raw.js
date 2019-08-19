module.exports = async ({ t: eventName, d: data }, client) => {
  if (eventName === 'MESSAGE_REACTION_ADD' || eventName === 'MESSAGE_REACTION_REMOVE') {
    const { channel_id: channelID, user_id: userID, message_id: messageID } = data;

    const channel = client.channels.get(channelID)
      || await client.users.get(userID).createDM();

    if (channel.messages && channel.messages.has(messageID)) return;

    const message = await channel.fetchMessage(messageID);

    // noinspection JSUnresolvedVariable
    const reaction = message.reactions.find((value) => value._emoji.name === data.emoji.name); // eslint-disable-line
    const user = client.users.get(userID);

    if (eventName === 'MESSAGE_REACTION_ADD') {
      client.emit('messageReactionAdd', reaction, user);
    } else {
      client.emit('messageReactionRemove', reaction, user);
    }
  }
};
