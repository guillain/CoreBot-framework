// Load tools library
let tools = require(__basedir + 'lib/tools');

// Configuration
let Botkit = require('botkit');

// Run the launcher
module.exports = function(config) {
  tools.debug('debug', 'launcher web run');

  // Set Spark bot user
  config.user = config.launcher.web.name;

  // Bot initialisation
  let controller = Botkit.socketbot({
    debug: config.log.debug,
    log: config.log.file,
    json_file_store: __basedir + config.launcher.web.store,
    studio_token: config.controller.on.botkit.token,
    replyWithTyping: config.launcher.web.replyWithTyping || true,
    typingDelayFactor: config.launcher.web.typingDelayFactor || 1.2
  });

  // Set up an Express-powered webserver to expose oauth and webhook endpoints
  controller = require(__dirname + '/express_webserver.js')(controller, config);

  // Open the web socket server
  controller.openSocketServer(controller.httpserver);

  // Scenario declarations
  controller = require(__basedir + 'controller/loader.js')(controller, config);

  // Start the bot brain in motion!!
  controller.startTicking();

  return controller;
};
