/*
 * ChatBot for Cisco Webex teams (old Cisco Spark)
 * @Target: CoreBot generic launcher
 * @Author: guillain (guillain.sanchez@dimensiondata.com)
 */

// Configuration
var config = require('./config');
var Botkit = require('./botkit/lib/Botkit.js');

// Bot initialisation
var controller = Botkit.sparkbot({
    debug: config.debug,
    log: config.log,
    public_address: config.spark.url,
    ciscospark_access_token: config.spark.access_token,
    studio_token: config.botkit_token,
    secret: config.spark.secret,
    webhook_name: 'botkit-translator',
//    limit_to_domain: ['mycompany.com'],
//    limit_to_org: 'my_cisco_org_id',
});

var bot = controller.spawn({});

// Setup web server
controller.setupWebserver(config.spark.port || 3000, function(err, webserver) {
    controller.createWebhookEndpoints(webserver, bot, function() {
        console.log("Cisco Spark: Webhooks set up!");
    });
});

// Scenario declarations
var scenario = require('./lib/scenario.js');
controller = scenario.run(controller);

