'use strict';

const client = require('../client');
const Log = require('../modules/Logger')

client.on('error', error => new Log('error', error));