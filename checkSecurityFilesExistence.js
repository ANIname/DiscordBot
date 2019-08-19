const { existsSync, writeFileSync, mkdirSync } = require('fs');
const { question } = require('cli-interact');

const dir = './security';

module.exports = async () => {
  if (!existsSync(dir)) mkdirSync(dir);

  await Promise.all([
    checkExistence(
      `${dir}/bot.json`,
      (securityFile) => securityFile && securityFile.token,
      (token) => ({ token }),
      'Чтобы запустить бота, введите его токен для авторизации.\n'
      + 'Его можно получить создав приложение на странице: https://discordapp.com/developers/applications/\n',
    ),
    checkExistence(
      `${dir}/mongodb.json`,
      (securityFile) => securityFile && securityFile.uri,
      (uri) => ({ uri }),
      'Чтобы хранить данные, вам нужна база данных. '
      + 'Введите пожалуйста ссылку для подключения.\n'
      + 'Пример: mongodb://localhost:27017/discordBot\n',
    ),
  ]);
};

function checkExistence(path, condition, value, message) {
  if (existsSync(path) && condition(require(path))) return;

  const answer = question(message);

  writeFileSync(path, JSON.stringify(value(answer)));
}
