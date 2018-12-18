// Load tools library
let tools = require(__basedir + 'lib/tools');

// Configuration
let Botkit = require(__basedir + 'botkit/lib/Botkit.js');

// Controller
exports.run = function(config) {
  tools.debug('debug', 'launcher hangouts run");

  let controller = Botkit.googlehangoutsbot({
    endpoint: config.launcher.hangouts.endpoint,
    token: config.launcher.hangouts.token,
    debug: config.log.debug,
    studio_token: config.controller.on.botkit.token
  });

  let bot = controller.spawn({})

  controller.setupWebserver(config.launcher.hangouts.port || 3002, function (err, webserver) {
    controller.createWebhookEndpoints(webserver, bot, function () {
      tools.debug('info', 'launcher hangouts run ok");
    });
  });

  // Scenario declarations
  let scenario = require(__basedir + 'controller/loader.js');
  controller = scenario.run(controller, config);
  return controller;
};

