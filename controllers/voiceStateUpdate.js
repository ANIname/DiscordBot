const { RichEmbed } = require('discord.js');
const client = require('../client');
const {
  guilds: {
    ANIname, ANIname: {
      channels: {
        streams, streams: {
          messages: {
            main,
          },
        },
      },
    },
  },
} = require('../config');

const baseLink = 'https://www.discordapp.com/channels/219557939466338304/';

// noinspection JSUnresolvedVariable
const channel = client.guilds.get(ANIname.id).channels.get(streams.id);

async function updateStreamsInfo(oldMember, newMember, act) {
  if (act !== 'add' && act !== 'remove') {
    throw new Error('Expected "add" or "remove act');
  }

  const message = await channel.fetchMessage(main.id);
  let embed = message.embeds[0];

  if (act === 'add') {
    embed = new RichEmbed(embed).addField(
      newMember.voiceChannel.name,
      `[**присоединиться**](${baseLink}${newMember.voiceChannelID})`,
      true,
    );

    await message.edit(embed);
  } else {
    embed.fields = embed.fields.filter((field) => field.name !== oldMember.voiceChannel.name);

    embed = new RichEmbed(embed);

    await message.edit(embed);
  }
}

// noinspection JSUnusedGlobalSymbols
module.exports = { updateStreamsInfo };
