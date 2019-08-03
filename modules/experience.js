'use strict';

const User = require('../models/User');
const {experience} = require('../config');

module.exports = {
  give: (id, forWhat) => {
    User.findOneAndUpdate({id}, {$inc: {xp: experience.give[forWhat]}}, {upsert:true}).exec()
  },
  
  take: (id, forWhat) => {
    User.findOneAndUpdate({id}, {$inc: {xp: -experience.take[forWhat]}}, {upsert:true}).exec()
  }
}