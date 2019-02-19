// Configuration
var Botkit = require('botkit');

module.exports = function(config) {
  var controller = Botkit.facebook({
    debug: config.log.debug,
    studio_token: config.controller.on.botkit.token
  });

  var bot = controller.spawn({
    token: config.web.token
  }).startRTM();


  // Scenario declarations
  var scenario = require(__basedir + 'lib/controller.js');
  controller = scenario.run(controller);
  return controller;
};

