// Emitted when the client hits a rate limit while making a request

'use strict';

const client = require('../client');

client.on('rateLimit', rateLimitInfo => console.info('rateLimit', rateLimitInfo));
