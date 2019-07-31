'use strict';

const Discord = require('discord.js');
const {guilds: {
  ANIname: {roles}
}} = require('../config');
const Log = require('../modules/Logger');

const richEmbed = new Discord.RichEmbed();

module.exports = (oldMember, newMember) => {
  const newRolesLength = newMember.roles.array().length;

  if (newRolesLength === 1) return addDefaultRole(newMember);
  if (newRolesLength > 2) return removeDefaultRole(newMember);
};

function addDefaultRole(member) {
  try {
    return member.addRole(roles.default, 'Юзер лишился всех ролей!');
  } catch (error) {
    richEmbed
      .setTitle(error.message)
      .setDescription(error.stack)
      .setTimestamp()
      .setFooter('Method: member.addRole', client.user.avatarURL);

    return new Log('error', richEmbed);
  }
}

function removeDefaultRole(member) {
  try {
    return member.removeRole('407889848192729089', 'Юзер лишился всех ролей!');
  } catch (error) {
    richEmbed
      .setTitle(error.message)
      .setDescription(error.stack)
      .setTimestamp()
      .setFooter('Method: member.addRole', client.user.avatarURL);

    return new Log('error', richEmbed);
  }
}