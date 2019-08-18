(async () => {
  await require('./checkSecurityFilesExistence')();

  require('./client');
})();
