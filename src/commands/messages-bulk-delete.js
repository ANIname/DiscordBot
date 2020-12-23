const find   = require('lodash/find');
const client = require('../client');

async function messagesBulkDeleteCommand(interaction) {
  const numberOfMessagesOption = find(interaction.data.options, (option) => option.name === 'number-of-messages');
  const numberOfMessages       = numberOfMessagesOption.value;
  const guildId                = interaction.guild_id;
  const channelId              = interaction.channel_id;
  const memberId               = interaction.member.user.id;
  const guild                  = await client.guilds.fetch(guildId);
  const channel                = await guild.channels.cache.get(channelId);
  const member                 = await guild.members.fetch(memberId);

  if (!member.hasPermission('MANAGE_MESSAGES')) {
    return {
      type: 4,
      data: {
        content:
            `<@${memberId}>, you do not have the right to delete other members posts. \n\n`
          + 'If you want to delete your messages, try to do it manually'
      },
    };
  }

  const deletedMessages = await channel.bulkDelete(numberOfMessages);

  return {
    type: 4,
    data: {
      content: `:recycle: Deleted ${deletedMessages.array().length} messages!`,
    },
  };
}

module.exports = messagesBulkDeleteCommand;