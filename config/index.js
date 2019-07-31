'use strict';

const importDir = require('directory-import');

const configs = importDir('./config', 'sync');

module.exports = configs[process.env.NODE_ENV || 'development'];