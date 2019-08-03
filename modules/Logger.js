'use strict';

const Discord = require('discord.js');
const client = require('../client');
const richEmbed = new Discord.RichEmbed();

/**
 * Logging in a separate discord server
 */
class Log {
  /**
   * @param {string} type - Warn || Error || Info
   * @param {string|error} message 
   */
  constructor(type, message) {
    switch (type) {
      case 'warn': {
        client.channels.get('606069891182886913').send(message);
        break;
      }

      case 'error': {
        if (message.stack) {
          richEmbed
            .setTitle(error.message)
            .setDescription(error.stack)
            .setTimestamp();

          if (message.footer) {
            richEmbed.setFooter(message.footer, client.user.avatarURL)
          }

          client.channels.get('606072489671524363').send(richEmbed);
        } else {
          client.channels.get('606072489671524363').send(message);
        }
        break;
      }

      case 'info': {
        client.channels.get('606072837715001354').send(message);
      }
    }
  }
}

module.exports = Log;