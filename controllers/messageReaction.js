const { guilds } = require('../config');

async function addRole({ message }, user, client) {
  const member = client.guilds.get(guilds.ANIname.id).members.get(user.id);
  const role = guilds.ANIname.roles.default.id;
  const reason = 'Новый юзер';

  await member.addRole(role, reason);

  message.delete();
}

module.exports = { addRole };
