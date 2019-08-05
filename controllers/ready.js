'use strict';

const forEach = require('foreach');
const Interval = require('../models/Interval');
const User = require('../models/User');
const getMention = require('../modules/getMention');
const declOfNum = require('../modules/declOfNum');
const {guilds: {ANIname}} = require('../config');
const client = require('../client');

const DEFAULT_INTERVAL = 5000;

async function updateTopRating(interval = DEFAULT_INTERVAL) {
  const data = await Interval.findOne({name: 'update-users-top'}).exec();

  if (data && data.interval) interval = data.interval;

  // noinspection JSUnresolvedVariable
  const message = await client
    .channels
    .get(ANIname.channels.counters)
    .fetchMessage(ANIname.messages.topUsers);
  const users = await User
    .find({xp: {$gt: 0}})
    .limit(10)
    .sort({xp: -1})
    .exec();
  let rating = '';

  forEach(users, ({xp, id}, index) => {
    const decl = declOfNum(xp, ['очко ЧСВ', 'очка ЧСВ', 'очков ЧСВ']);

    rating += `\n${index + 1}) ${getMention(ANIname.id, id)} - ${xp} ${decl}`;
  });

  const decl = declOfNum(users.length, ['участник', 'участника', 'участников']);

  // noinspection JSIgnoredPromiseFromCall
  message.edit(
    '```Markdown\n' +
    `# Топ ${users.length} ${decl} по количеству очков чсв\n` +
    '```' +
    rating
  );

  setTimeout(updateTopRating, interval);
}

const HOUR_IN_MILLISECONDS = 3600000;

setInterval(() => {
  // noinspection SpellCheckingInspection, JSIgnoredPromiseFromCall
  Interval.findOneAndUpdate({name: 'update-users-top'}, {$inc: {interval: DEFAULT_INTERVAL}}, {upsert: true}).exec();
}, HOUR_IN_MILLISECONDS);

module.exports = {updateTopRating};
