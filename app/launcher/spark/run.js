// Load tools library
var Log = require(__basedir + 'lib/log');

// Configuration
var Botkit = require('botkit');

// Run the launcher
module.exports = function(config) {
  Log.debug('launcher spark run');

  // Bot initialisation
  let controller = Botkit.sparkbot({
    debug: config.log.debug,
    log: config.log.file,
    json_file_store: __basedir + config.launcher.spark.store,
    public_address: config.launcher.spark.url,
    ciscospark_access_token: config.launcher.spark.access_token,
    studio_token: config.controller.on.botkit.token,
    secret: config.launcher.spark.secret,
    webhook_name: config.launcher.spark.name,
    // ToDo
    // limit_to_domain: ['mycompany.com'],
    // limit_to_org: 'my_cisco_org_id',
  });

  let bot = controller.spawn({});

  // Setup web server
  controller.setupWebserver(config.launcher.spark.port || 3000, function(err, webserver) {
    controller.createWebhookEndpoints(webserver, bot, function() {
      Log.info('launcher spark run ok');
    });
  });

  // Scenario declarations
  controller = require(__basedir + 'lib/controller.js')(controller, config, ['hears','on']);

  return controller;
};

