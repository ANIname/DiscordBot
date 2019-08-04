'use strict';

const mongoose = require('mongoose');

let uri;
try {
  uri = require('./connect')[process.env.NODE_ENV || 'development'];
} catch (error) {
  switch (error.code) {
    case 'MODULE_NOT_FOUND': {
      throw console.error(
        'Not found MONGODB URI. Create file "db/connect.json". With the following content:\n\n',

        JSON.stringify({
          "development": "PASTE MONGODB URI HERE",
          "production": "PASTE MONGODB URI HERE"
        }, null, 2)
      );
    }

    default: {
      throw console.error(error);
    }
  }
}

mongoose.connect(uri, {
  useNewUrlParser: true,
  useFindAndModify: false
});

const index = mongoose.connection;

module.exports = index;
