const { existsSync, writeFileSync, mkdirSync } = require('fs');
const { question } = require('cli-interact');

const dir = './security';

module.exports = async () => {
  if (!existsSync(dir)) mkdirSync(dir);

  await Promise.all([
    checkExistence(
      `${dir}/bot.json`,
      (securityFile) => securityFile && securityFile.token,
      'Чтобы запустить бота, введите его токен для авторизации.\n'
      + 'Его можно получить создав приложение на странице: https://discordapp.com/developers/applications/\n',
    ),
  ]);
};

function checkExistence(path, condition, message) {
  if (existsSync(path) && condition(require(path))) return;

  const token = question(message);

  writeFileSync(path, JSON.stringify({ token }));
}
