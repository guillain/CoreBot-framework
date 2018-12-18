// Configuration
let Botkit = require(__basedir + 'botkit/lib/Botkit.js');

// Launcher
exports.run = function(config) {
  let controller = Botkit.slackbot({
    debug: config.log.debug,
    studio_token: config.controller.on.botkit.token
  });

  let bot = controller.spawn({
    token: config.launcher.slack.token
  }).startRTM();


  // Scenario declarations
  let scenario = require(__basedir + 'controller/loader.js');
  controller = scenario.run(controller);
  return controller;
};

