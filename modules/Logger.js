'use strict';

const client = require('../client');

class Log {
  constructor(type, message) {
    switch (type) {
      case 'warn': {
        client.channels.get('606069891182886913').send(message);
        break;
      }

      case 'error': {
        client.channels.get('606072489671524363').send(message);
        break;
      }

      case 'info': {
        client.channels.get('606072837715001354').send(message);
      }
    }
  }
}

module.exports = Log;