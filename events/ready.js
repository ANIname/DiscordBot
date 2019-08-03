'use strict';

const forEach = require('foreach');
const User = require('../models/User');
const getMention = require('../modules/getMention');
const declOfNum = require('../modules/declOfNum');
const {guilds: {ANIname}} = require('../config');
const client = require('../client');
const db = require('../db');

client.on('ready', () => {
  console.info(`${client.user.username} bot ready to work!`);

  startUpdatingRatingByInterval();
});

db.once('open', () => {
  console.info(`Connected to ${db.db.databaseName} database`);
});

function startUpdatingRatingByInterval() {
  setInterval(async () => {
    const message = await client
      .channels
      .get(ANIname.channels.counters)
      .fetchMessage('607254367115935776');
    const users = await User
      .find({xp: {$gt: 0}})
      .limit(10)
      .sort({xp: -1})
      .exec();
    let rating = ''
  
    forEach(users, ({xp, id}, index) => {
      const decl = declOfNum(xp, ['очко ЧСВ', 'очка ЧСВ', 'очков ЧСВ']);
  
      rating += `\n${index + 1}) ${getMention(ANIname.id, id)} - ${xp} ${decl}`;
    });
  
    const decl = declOfNum(users.length, ['участник', 'участника', 'участников'])
    
    message.edit(
      '```Markdown\n' +
      `# Топ ${users.length} ${decl} по количеству очков чсв\n` + 
      '```' +
      rating
    );
  }, 5000);
}