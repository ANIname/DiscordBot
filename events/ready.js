module.exports = (client) => {
  console.info(`${client.user.username} is ready to work`);

  // noinspection JSIgnoredPromiseFromCall
  client.user.setActivity('YouTube', { type: 'WATCHING' });
};
