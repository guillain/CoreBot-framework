// Load tools library
let tools = require(__basedir + 'lib/tools');

// Configuration
let Botkit = require('botkit');

// Controller
module.exports = function(config) {
  tools.debug('debug', 'launcher hangouts run');

  process.env.GOOGLE_APPLICATION_CREDENTIALS = __basedir + config.launcher.hangouts.json_cred;

  let controller = Botkit.googlehangoutsbot({
    endpoint: config.launcher.hangouts.endpoint,
    token: config.launcher.hangouts.token,
    debug: config.log.debug,
    studio_token: config.controller.on.botkit.token,
    json_file_store: __basedir + config.launcher.hangouts.store
  });

  let bot = controller.spawn({})

  controller.setupWebserver(config.launcher.hangouts.port || 3002, function (err, webserver) {
    controller.createWebhookEndpoints(webserver, bot, function () {
      tools.debug('info', 'launcher hangouts run ok');
    });
  });

  // Scenario declarations
  controller = require(__basedir + 'controller/loader.js')(controller, config);

  return controller;
};

