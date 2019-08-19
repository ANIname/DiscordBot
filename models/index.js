const importDir = require('directory-import');

const models = {};

importDir('./models', 'sync', (name, path, func) => {
  if (name !== 'index') models[name] = func;
});

module.exports = models;
