// Load tools library
let Log = require(__basedir + 'lib/log');

// Configuration
let Botkit = require('botkit');

// Controller
module.exports = function(config) {
  Log.debug('launcher hangouts run');

  process.env.GOOGLE_APPLICATION_CREDENTIALS = __basedir + config.launcher.hangouts.json_cred;

  let controller = Botkit.googlehangoutsbot({
    endpoint: config.launcher.hangouts.endpoint,
    token: config.launcher.hangouts.token,
    debug: config.log.debug,
    studio_token: config.controller.on.botkit.token,
    json_file_store: __basedir + config.launcher.hangouts.store
  });

  let bot = controller.spawn({});

  controller.setupWebserver(config.launcher.hangouts.port || 3002, function (err, webserver) {
    controller.createWebhookEndpoints(webserver, bot, function () {
      Log.info('launcher hangouts run ok');
    });
  });

  // Scenario declarations
  controller = require(__basedir + 'lib/controller.js')(controller, config);

  return controller;
};

