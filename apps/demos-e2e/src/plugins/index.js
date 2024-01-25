const { preprocessTypescript } = require('@nx/cypress/plugins/preprocessor');

module.exports = (on, config) => {
  on('file:preprocessor', preprocessTypescript(config));
};
