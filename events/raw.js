'use strict';

const client = require('../client');
const emitEvent = require('../controllers/emitEvent');

client.on('raw', emitEvent);
