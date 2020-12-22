const fetch = require('node-fetch');

async function fetchJSON(url, inc) {
  const response = await fetch(url, inc);

  return response.json();
}

module.exports = fetchJSON;