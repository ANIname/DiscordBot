'use strict';

const User = require('../models/User');
const client = require('../client');

module.exports = {
  removeMessageAboutStreaming: async (userId) => {
    const user = await User.findOne({id: userId}).exec();

    if (user && user.streaming && user.streaming.status) {
      User.updateOne({id: userId}, {streaming: {status: false, channelId: null, messageId: null}}, {upsert: true}).exec();

      const {channelId, messageId} = user.streaming;

      const message = await client.channels.get(channelId).fetchMessage(messageId);

      if (message && message.deletable) return  message.delete();
    }
  }
};