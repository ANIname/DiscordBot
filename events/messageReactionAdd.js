const { messageReaction } = require('../controllers');

module.exports = (reaction, user, client) => {
  if (user.bot) return;

  const embed = reaction.message.embeds[0];

  if (embed && embed.title === 'Добро пожаловать к нам гильдию!' && reaction.emoji.name === '✅') {
    return messageReaction.addRole(reaction, user, client);
  }
};
