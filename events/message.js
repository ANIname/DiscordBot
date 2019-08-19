const { bot: { prefix } } = require('../config');
const {
  message: { supportMessage, commandExecution },
} = require('../controllers');

module.exports = async (msg) => {
  const { author, content, channel } = msg;

  if (author.bot) return;

  if (channel.type === 'DM') {
    return supportMessage(msg);
  }

  if (content.startsWith(prefix)) {
    return commandExecution(msg);
  }
};
