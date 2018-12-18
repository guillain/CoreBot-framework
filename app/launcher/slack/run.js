// Load tools library
let tools = require(__basedir + 'lib/tools');

// Configuration
let Botkit = require(__basedir + 'botkit/lib/Botkit.js');

// Launcher
exports.run = function(config) {
  tools.debug('debug', 'launcher slack run");

  let controller = Botkit.slackbot({
    debug: config.log.debug,
    studio_token: config.controller.on.botkit.token
  });

  let bot = controller.spawn({
    token: config.launcher.slack.token
  }).startRTM();

  tools.debug('info', 'launcher slack run ok");

  // Scenario declarations
  let scenario = require(__basedir + 'controller/loader.js');
  controller = scenario.run(controller, config);
  return controller;
};

