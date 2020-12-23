const forEach  = require('lodash/forEach');
const client   = require('../client');
const commands = require('../commands');

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
client.ws.on('INTERACTION_CREATE', async (interaction) => {
  const commandName = interaction.data.name;

  interaction.data.options = cleanUpCommandOptions(interaction.data.options);


  if (typeof commands[commandName] !== 'function') return;

  const response = await commands[commandName](interaction);

  client.api.interactions(interaction.id, interaction.token).callback.post({ data: response });
});

function cleanUpCommandOptions(commandOptions) {
  const cleanUppedCommandOptions = {};

  forEach(commandOptions, (commandOption) => cleanUppedCommandOptions[commandOption.name] = commandOption.value);

  return cleanUppedCommandOptions;
}