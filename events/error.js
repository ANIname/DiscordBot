'use strict';

const client = require('../client');
const db = require('../db');
const Log = require('../modules/Logger')

client.on('error', error => new Log('error', error));

db.on('error', error => new Log('error', error));
