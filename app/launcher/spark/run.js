// Configuration
global.__basedir = '../../' + __dirname  + '/';;
let config = require('../../config.json');
let Botkit = require('../../botkit/lib/Botkit.js');

// Bot initialisation
let controller = Botkit.sparkbot({
    debug: config.log.debug,
    log: config.log.file,
    public_address: config.launcher.spark.url,
    ciscospark_access_token: config.launcher.spark.access_token,
    studio_token: config.botkit_token,
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
        console.log("Cisco Spark: Webhooks set up!");
    });
});

// Scenario declarations
let scenario = require('../../controller/loader.js');
controller = scenario.run(controller);
