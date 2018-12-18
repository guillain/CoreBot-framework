// Configuration
var Botkit = require(__basedir + 'botkit/lib/Botkit.js');

exports.run = function(config) {
  var controller = Botkit.teamsbot({
    clientId: config.launcher.teams.clientId,
    clientSecret: config.launcher.teams.clientSecret,
    studio_token: config.botkit_token
  });

  controller.setupWebserver(config.launcher.teams.port || 3001, function(err, webserver) {
    controller.createWebhookEndpoints(webserver, function() {
      console.log("Microsoft Teams: Webhooks set up!");
    });
  });

  // Scenario declarations
  var scenario = require(__basedir + 'controller/loader.js');
  controller = scenario.run(controller);
  return controller;
};

