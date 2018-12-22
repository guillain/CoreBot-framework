// Load tools library
let tools = require(__basedir + 'lib/tools');
//let server = require(__basedir + 'launcher/web/server.js');

// Configuration
let Botkit = require('botkit');

// Run the launcher
exports.run = function(config) {
  tools.debug('debug', 'launcher web run');

  // Set Spark bot user
  config.user = config.launcher.web.name;

  // Bot initialisation
  let controller = Botkit.anywhere({
    debug: config.log.debug,
    log: config.log.file,
    json_file_store: __basedir + config.launcher.web.store,
    studio_token: config.controller.on.botkit.token,
    replyWithTyping: config.launcher.web.replyWithTyping || true,
    typingDelayFactor: config.launcher.web.typingDelayFactor || 1.2
  });

  let bot = controller.spawn({});

  // Setup web server
  controller.setupWebserver(config.launcher.web.port || 3000, function(err, webserver) {
    //controller.createWebhookEndpoints(webserver, bot, function() {
      tools.debug('info', 'launcher web run ok');
    //});
  });

  // Scenario declarations
  let scenario = require(__basedir + 'controller/loader.js');
  controller = scenario.run(controller, config);
  return controller;
};
