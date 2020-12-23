const find   = require('lodash/find');
const client = require('../client');

/**
 *
 * @param {Object} interaction               - An interaction is the base "thing" that is sent when a user invokes a command, and is the same for Slash Commands and other future interaction types
 * @param {String} interaction.id            - id of the interaction
 * @param {(1|2) } interaction.type          - the type of interaction
 * @param {Object} interaction.data          - the command data payload
 * @param {String} interaction.guild_id      - the guild it was sent from
 * @param {String} interaction.channel_id    - the channel it was sent from
 * @param {Object} interaction.member        - guild member data for the invoking user
 * @param {String} interaction.token         - a continuation token for responding to the interaction
 * @param {Number} interaction.version       - read-only property, always 1
 *
 * @returns {
 *   Promise<{
 *     data: { content: string },
 *     type: number
 *   }
 * >}
 */
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