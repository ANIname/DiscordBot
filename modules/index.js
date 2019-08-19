const importDir = require('directory-import');

const modules = {};

importDir('./modules', 'sync', (name, path, func) => {
  if (name !== 'index') modules[name] = func;
});

module.exports = modules;
