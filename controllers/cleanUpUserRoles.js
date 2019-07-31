'use strict';

const {guilds: {
  ANIname: {roles}
}} = require('../config');
const Log = require('../modules/Logger');

module.exports = (oldMember, newMember) => {
  const newRolesLength = newMember.roles.array().length;

  if (newRolesLength === 1) return addDefaultRole(newMember);
  if (newRolesLength > 2) return removeDefaultRole(newMember);
};

function addDefaultRole(member) {
  try {
    return member.addRole(roles.default, 'Юзер лишился всех ролей!');
  } catch (error) {
    error.footer = 'Method: member.addRole';

    return new Log('error', error);
  }
}

function removeDefaultRole(member) {
  try {
    return member.removeRole('407889848192729089', 'Юзер лишился всех ролей!');
  } catch (error) {
    error.footer = 'Method: member.removeRole';

    return new Log('error', error);
  }
}