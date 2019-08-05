'use strict';

const client = require('../client');
const {bot: {prefix}} = require('../config');
const experience = require('../modules/experience');

client.on('messageDelete', async message => {
  if (message.author.bot || message.content.startsWith(prefix)) return;

  if (message.content.length) {
    experience.take(message.author.id, message.content.length);
  }
});