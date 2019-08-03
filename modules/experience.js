'use strict';

const User = require('../models/User');

module.exports = {
  give: (id, xp) => User.findOneAndUpdate({id}, {$inc: {xp}}, {upsert:true}).exec(),
  take: (id, xp) => User.findOneAndUpdate({id}, {$inc: {xp: -xp}}, {upsert:true}).exec()
}