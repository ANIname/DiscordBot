// Emitted when the client hits a rate limit while making a request

'use strict';

const Interval = require('../models/Interval');
const client = require('../client');
const {
  guilds: {ANIname: {channels, messages}}
} = require('../config');

client.on('rateLimit', rateLimitInfo => {
  console.info('rateLimit', rateLimitInfo);

  const {path, timeDifference} = rateLimitInfo;

  if (path === `/channels/${channels.counters}/messages/${messages.topUsers}`) {
    return Interval.findOneAndUpdate({name: 'update-users-top'}, {$inc: {interval: timeDifference}}, {upsert: true}).exec();
  }
});
