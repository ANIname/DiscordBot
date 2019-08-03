'use strict';

const client = require('../client');
const Log = require('../modules/Logger')

client.on('warn', warn => new Log('warn', warn));