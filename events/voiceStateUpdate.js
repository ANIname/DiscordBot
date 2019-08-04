'use strict';

const client = require('../client');
const voiceStateUpdate = require('../controllers/voiceStateUpdate');

client.on('voiceStateUpdate', (oldMember, newMember) => {
  if (oldMember.voiceChannelID && !newMember.voiceChannelID) {
    return voiceStateUpdate.removeMessageAboutStreaming(newMember.id);
  }
});
