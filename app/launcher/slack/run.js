// Load tools library
let tools = require(__basedir + 'lib/tools');

// Configuration
let Botkit = require('botkit');

// Launcher
module.exports = function(config) {
  tools.debug('debug', 'launcher slack run');

  // Set Spark bot user
  config.user = config.launcher.spark.name;

  // Bot initialisation
  let controller = Botkit.slackbot({
    debug: config.log.debug,
    studio_token: config.controller.on.botkit.token,
    json_file_store: __basedir + config.launcher.slack.store,
    clientSigningSecret: __basedir + config.launcher.slack.secret
  });

  let bot = controller.spawn({
    token: config.launcher.slack.token
  }).startRTM();

  tools.debug('info', 'launcher slack run ok');

  // Scenario declarations
  controller = require(__basedir + 'controller/loader.js')(controller, config);

  return controller;
};

