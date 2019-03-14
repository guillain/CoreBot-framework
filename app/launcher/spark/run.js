// Load tools library
var Log = require(__basedir + 'lib/log');
var User = require(__basedir + 'lib/user');

// Configuration
var Botkit = require('botkit');

// Run the launcher
module.exports = function(config) {
  Log.debug('launcher spark run');

  // Bot initialisation
  var controller = Botkit.sparkbot({
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

  var bot = controller.spawn({});

  // Setup web server
  controller.setupWebserver(config.launcher.spark.port || 3000, function(err, webserver) {
    controller.createWebhookEndpoints(webserver, bot, function() {
      Log.info('launcher spark run ok');
    });
  });

  // Scenario declarations
  controller = require(__basedir + 'lib/controller.js')(controller, config, ['hears','on']);

  if(config.launcher.spark.user_presence){
      User.user_presence_delete();
      let user_presence_delay = config.launcher.spark.user_presence_delay;
      setInterval(User.user_presence_webex, user_presence_delay*1000, controller);
  }

  return controller;
};

