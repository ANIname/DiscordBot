'use strict';

const User = require('../models/User');
const Log = require('../modules/Logger');
const {experience} = require('../config');

/**
 * Xp increment
 * 
 * @param {number} id - User id
 * @param {number|null} xp - Custom amount xp. If this parameter is specified, the next one will be ignored.
 * @param {string} forWhat - Number xp based on data in the config. If the previous parameter was specified, this one will be ignored.
 */
function give (id, xp, forWhat) {
  try {
    if (xp) {
      return User.findOneAndUpdate({id}, {$inc: {xp}}, {upsert: true}).exec();
    }
  
    User.findOneAndUpdate({id}, {$inc: {xp: experience.give[forWhat]}}, {upsert: true}).exec();
  } catch(error) {
    error.footer = 'Method: experience.give';

    new Log('error', error);
  }
}

/**
 * Xp decrement
 * 
 * @param {number} id - User id
 * @param {number|null} xp - Custom amount xp. If this parameter is specified, the next one will be ignored.
 * @param {string} forWhat - Number xp based on data in the config. If the previous parameter was specified, this one will be ignored.
 */
function take(id, xp, forWhat) {
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

module.exports = {give, take};
