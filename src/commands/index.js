const importDir = require('directory-import');

const commands = {};

importDir({}, (commandName, commandPath, commandFunc) => {
  commands[commandName] = commandFunc;
});

module.exports = commands;