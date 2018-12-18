// Load tools library
let tools = require(__basedir + 'lib/tools');

// Configuration
var Botkit = require(__basedir + 'botkit/lib/Botkit.js');

exports.run = function(config) {
  tools.debug('debug', 'launcher teams run");

  var controller = Botkit.teamsbot({
    clientId: config.launcher.teams.clientId,
    clientSecret: config.launcher.teams.clientSecret,
    studio_token: config.controller.on.botkit.token
  });

  controller.setupWebserver(config.launcher.teams.port || 3001, function(err, webserver) {
    controller.createWebhookEndpoints(webserver, function() {
      tools.debug('info', 'launcher teams run ok");
    });
  });

  // Scenario declarations
  var scenario = require(__basedir + 'controller/loader.js');
  controller = scenario.run(controller,config);
  return controller;
};

