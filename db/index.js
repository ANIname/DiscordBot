const mongoose = require('mongoose');
const { mongodb: { uri } } = require('../security');

(async () => {
  try {
    await mongoose.connect(uri, { useNewUrlParser: true });
  } catch (error) {
    throw new Error(error);
  }
})();

const db = mongoose.connection;

db.once('open', () => console.info(`Connected to ${db.db.databaseName} database`));

module.exports = db;
