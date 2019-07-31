'use strict';

const Discord = require('discord.js');
const client = require('../client');
const Log = require('../modules/Logger');

const richEmbed = new Discord.RichEmbed();

module.exports = {
  addRole: async (reaction, user) => {
    const {message} = reaction;
    const member = client.guilds.get('219557939466338304').members.get(user.id);

    try {
      await member.addRole('407889848192729089', 'Новый юзер!');
    } catch (error) {
      richEmbed
        .setTitle(error.message)
        .setDescription(error.stack)
        .setTimestamp()
        .setFooter('Method: member.addRole', client.user.avatarURL);

      return new Log('error', richEmbed);
    }

    message.delete();
  }
};