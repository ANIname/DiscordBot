'use strict';

const Discord = require('discord.js');
const client = require('../client');
const {guilds: {
  ANIname
}} = require('../config');
const Log = require('../modules/Logger');

const richEmbed = new Discord.RichEmbed();

module.exports = {
  addRole: async (reaction, user) => {
    const {message} = reaction;
    const member = client.guilds.get(ANIname.id).members.get(user.id);

    try {
      await member.addRole(ANIname.roles.default, 'Новый юзер!');
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