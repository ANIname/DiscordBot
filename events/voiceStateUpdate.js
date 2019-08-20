const {
  voiceStateUpdate: { updateStreamsInfo },
} = require('../controllers');

module.exports = async (oldMember, newMember) => {
  if (newMember.voiceChannel && newMember.voiceChannel.members.array().length === 1) {
    await updateStreamsInfo(oldMember, newMember, 'add');
  }

  if (oldMember.voiceChannel && oldMember.voiceChannel.members.array().length === 0) {
    await updateStreamsInfo(oldMember, newMember, 'remove');
  }
};
