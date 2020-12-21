const Discord = require('discord.js');
const client  = require('../client');

const { DISCORD_STATUS_MESSAGE, DISCORD_CHANNEL_PING, DISCORD_GUILD_ANINAME } = process.env;

async function setUpStatusEmbed() {
  const guild        = await client.guilds.fetch(DISCORD_GUILD_ANINAME);
  const pingChannel  = await guild.channels.resolve(DISCORD_CHANNEL_PING);
  const pingMassage  = await pingChannel.messages.fetch(DISCORD_STATUS_MESSAGE);
  const botAvatarURL = client.user.avatarURL({ dynamic: true, size: 32 });
  const statusEmbed  = new Discord.MessageEmbed();

  statusEmbed.addFields([
    { name: 'Total channels',  value: guild.channels.cache.array().length, inline: true  },
    { name: 'Total members',   value: guild.memberCount,                   inline: true  },
    { name: 'Active members',  value: null,                                inline: true  },
    { name: '\u200b',          value: '\u200b',                            inline: false },
    { name: 'Main admin',      value: '<@219556681502162945>',             inline: true  },
    { name: 'Main bot',        value: '<@428598137490505728>',             inline: true  },
    { name: 'Command prefix',  value: '/',                                 inline: true  },
    { name: '\u200b',          value: '\u200b',                            inline: false },
  ]);

  statusEmbed.setTimestamp(client.readyTimestamp);
  statusEmbed.setFooter('Bot last restart at', botAvatarURL);

  await pingMassage.edit(null, { embed: statusEmbed });
}

module.exports = setUpStatusEmbed;