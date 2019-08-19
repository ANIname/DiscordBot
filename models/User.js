const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  id: {
    type: 'number',
    required: true,
  },
});

module.exports = mongoose.model('User', schema);
