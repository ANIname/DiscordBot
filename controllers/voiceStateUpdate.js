const { throwError } = require('../modules');
const { Embed } = require('../models');
const client = require('../client');

const baseLink = 'https://www.discordapp.com/channels/219557939466338304/';

async function updateStreamsInfo(oldMember, newMember, action) {
  checkErrors();

  const embedName = 'Доступные трансляции';

  const {
    body,
    guildID,
    channelID,
    messageID,
  } = await getEmbed();

  const embedBody = await prepareEmbedBody(body);

  await updateEmbedInDB();

  return updateMessage();

  // ///////////////////////////////////////// Handlers \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ \\

  async function getEmbed() {
    let result;

    try {
      result = await Embed.findOne({ name: embedName });
    } catch (error) {
      throw new Error(error);
    }

    if (!result) throw new Error('No result from db for updating streams info');

    return result;
  }

  function checkErrors() {
    if (typeof oldMember !== 'object' || typeof newMember !== 'object') {
      throw new Error('Expected member');
    }

    if (action !== 'add' && action !== 'remove') {
      throw new Error('Expected "add" or "remove action');
    }
  }

  // eslint-disable-next-line
  async function prepareEmbedBody(body) {
    const result = body;

    if (action === 'add' && !await ignoreTheAction()) {
      result.fields.push({
        name: newMember.voiceChannel.name,
        value: `[**присоединиться**](${baseLink}${newMember.voiceChannelID})`,
        inline: true,
      });
    } else {
      result.fields = result.fields.filter((field) => field.name !== oldMember.voiceChannel.name);
    }

    result.timestamp = new Date();
    result.color = newMember.displayColor;

    return result;

    /**
     * Ignore if this is an afk channel, or it is already in the message
     * @return {boolean}
     */
    async function ignoreTheAction() {
      if (newMember.voiceChannel.id === newMember.guild.afkChannelID) {
        // noinspection JSUnusedAssignment
        return true;
      }

      return result.fields.some((field) => field.name === newMember.voiceChannel.name);
    }
  }

  async function updateEmbedInDB() {
    try {
      await Embed.findOneAndUpdate(
        { name: embedName },
        { body: embedBody },
      ).exec();
    } catch (error) {
      throw new Error(error);
    }
  }

  async function updateMessage() {
    try {
      // noinspection JSUnresolvedVariable
      const message = await client
        .guilds.get(guildID)
        .channels.get(channelID)
        .fetchMessage(messageID)
        .catch(throwError);

      await message.edit({ embed: embedBody }).catch(throwError);
    } catch (error) {
      throw new Error(error);
    }
  }
}

// noinspection JSUnusedGlobalSymbols
module.exports = { updateStreamsInfo };
