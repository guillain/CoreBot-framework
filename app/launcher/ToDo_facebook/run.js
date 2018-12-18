// Configuration
var Botkit = require(__basedir + 'botkit/lib/Botkit.js');

exports.run = function(config) {
  let controller = Botkit.facebook({
    debug: config.log.debug,
    studio_token: config.botkit_token
  });

  let bot = controller.spawn({
    token: config.web.token
  }).startRTM();


  // Scenario declarations
  let scenario = require(__basedir + 'controller/loader.js');
  controller = scenario.run(controller);
  return controller;
};

