const {
  voiceStateUpdate: { updateStreamsInfo },
} = require('../controllers');

module.exports = (oldMember, newMember) => {
  if (newMember.voiceChannel && newMember.voiceChannel.members.array().length === 1) {
    updateStreamsInfo(oldMember, newMember, 'add');
  }

  if (oldMember.voiceChannel && oldMember.voiceChannel.members.array().length === 0) {
    updateStreamsInfo(oldMember, newMember, 'remove');
  }
};
