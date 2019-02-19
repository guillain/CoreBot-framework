// Load tools library
var Log = require(__basedir + 'lib/log');

// Configuration
var Botkit = require('botkit');

module.exports = function(config) {
  Log.debug('launcher teams run');

  var controller = Botkit.teamsbot({
    clientId: config.launcher.teams.clientId,
    clientSecret: config.launcher.teams.clientSecret,
    studio_token: config.controller.on.botkit.token,
    json_file_store: __basedir + config.launcher.teams.store
  });

  controller.setupWebserver(config.launcher.teams.port || 3001, function(err, webserver) {
    controller.createWebhookEndpoints(webserver, function() {
      Log.info('launcher teams run ok');
    });
  });

  // Scenario declarations
  controller = require(__basedir + 'lib/controller.js')(controller, config, ['hears','on']);

  return controller;
};

