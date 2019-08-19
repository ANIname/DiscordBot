(async () => {
  await require('./checkSecurityFilesExistence')();

  require('./db');
  require('./client');
})();
