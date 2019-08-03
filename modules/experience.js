'use strict';

const User = require('../models/User');
const {experience} = require('../config');

module.exports = {
  give: (id, xp, forWhat) => {
    if (xp) {
      return User.findOneAndUpdate({id}, {$inc: {xp}}, {upsert: true}).exec();
    }

    User.findOneAndUpdate({id}, {$inc: {xp: experience.give[forWhat]}}, {upsert: true}).exec();
  },
  
  take: (id, xp, forWhat) => {
    if (xp) {
      return User.findOneAndUpdate({id}, {$inc: {xp: -xp}}, {upsert: true}).exec();
    }

    User.findOneAndUpdate({id}, {$inc: {xp: -experience.take[forWhat]}}, {upsert: true}).exec();
  }
}