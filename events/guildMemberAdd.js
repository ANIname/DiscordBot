const { RichEmbed } = require('discord.js');

module.exports = async (member, client) => {
  const message = member.send(greeting(client));

  message.react('✅');
};

const greeting = (client) => new RichEmbed()
  .setColor('#7289DA')
  .setTitle('Добро пожаловать к нам гильдию!')
  .setURL('https://discord.gg/ADFYZtJ')
  .setThumbnail(client.user.avatarURL)
  .setDescription(
    'Очень хорошо, что ты хочешь к нам присоединиться :grinning:.'
    + '\n\nОднако прежде чем я выдам тебе роль и покажу тебе наши комнаты - мне нужно твоё согласие с нашими правилами:'
    + '\n\nhttps://book.aniname.com/discord'
    + '\n\nКак только ты прочтешь правила - дай знать мне это, нажав на символ "✅", под этим сообщением и тогда я открою тебе доступ к нашей гильдии.',
  )
  .setImage('https://cdn.discordapp.com/attachments/413313254354583557/612794440238628914/tmb_102732_6016.jpg');
