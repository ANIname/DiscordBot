const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: 'string',
    required: true,
    primaryKey: true,
  },
  guildID: {
    type: 'string',
    required: true,
  },
  channelID: {
    type: 'string',
    required: true,
  },
  messageID: {
    type: 'string',
    required: true,
  },
  body: {
    type: 'object',
    required: true,
  },
});

module.exports = mongoose.model('Embed', schema);
