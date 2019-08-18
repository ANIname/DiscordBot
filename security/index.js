const importDir = require('directory-import');

const securityFiles = {};

importDir('./security', 'sync', (name, path, func) => {
  if (name !== 'index') securityFiles[name] = func;
});

module.exports = securityFiles;
