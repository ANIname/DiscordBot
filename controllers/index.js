const importDir = require('directory-import');

const controllers = {};

importDir('./controllers', 'sync', (name, path, func) => {
  if (name !== 'index') controllers[name] = func;
});

module.exports = controllers;
