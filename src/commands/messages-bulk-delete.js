const client = require('../client');

async function messagesBulkDeleteCommand(interaction) {
  const numberOfMessages = interaction.data.options;
  const guildId          = interaction.guild_id;
  const channelId        = interaction.channel_id;
  const memberId         = interaction.member.user.id;
  const guild            = await client.guilds.fetch(guildId);
  const member           = await guild.members.fetch(memberId);
  const channel          = await guild.channels.cache.get(channelId);

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