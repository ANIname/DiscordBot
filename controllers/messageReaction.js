'use strict';

const client = require('../client');
const {guilds: {
  ANIname
}} = require('../config');
const Log = require('../modules/Logger');

module.exports = {
  addRole: async (reaction, user) => {
    const {message} = reaction;
    const member = client.guilds.get(ANIname.id).members.get(user.id);

    try {
      await member.addRole(ANIname.roles.default, 'Новый юзер!');
    } catch (error) {
      error.footer = 'Method: member.addRole';

      return new Log('error', error);
    }

    message.delete();
  }
};