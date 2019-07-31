'use strict';

const client = require('../client');
const cleanUpUserRoles = require('../controllers/cleanUpUserRoles');

client.on('guildMemberUpdate', (oldMember, newMember) => {
  if (oldMember.roles.array().length !== newMember.roles.array().length) return cleanUpUserRoles(oldMember, newMember);
});