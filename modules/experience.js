'use strict';

const User = require('../models/User');
const Log = require('../modules/Logger');
const {experience} = require('../config');

module.exports = {
  give: (id, xp, forWhat) => {
    try {
      if (xp) {
        return User.findOneAndUpdate({id}, {$inc: {xp}}, {upsert: true}).exec();
      }
  
      User.findOneAndUpdate({id}, {$inc: {xp: experience.give[forWhat]}}, {upsert: true}).exec();
    } catch(error) {
      error.footer = 'Method: experience.give';

      new Log('error', error);
    }
  },
  
  take: (id, xp, forWhat) => {
    try {
      if (xp) {
        return User.findOneAndUpdate({id}, {$inc: {xp: -xp}}, {upsert: true}).exec();
      }
  
      User.findOneAndUpdate({id}, {$inc: {xp: -experience.take[forWhat]}}, {upsert: true}).exec();
    } catch(error) {
      error.footer = 'Method: experience.take';

      new Log('error', error);
    }
  }
}