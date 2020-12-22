const client   = require('../client');
const commands = require('../commands');

client.ws.on('INTERACTION_CREATE', async (interaction) => {
  const { name: commandName } = interaction.data

  if (typeof commands[commandName] !== 'function') return;

  const response = await commands[commandName](interaction);

  client.api.interactions(interaction.id, interaction.token).callback.post({ data: response });
});
