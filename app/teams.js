/*
 * ChatBot for Cisco Webex teams (old Cisco Spark)
 * @Target: CoreBot generic launcher
 * @Author: guillain (guillain.sanchez@dimensiondata.com)
 */

// Configuration
var config = require('./config');
var Botkit = require('./botkit/lib/Botkit.js');
//var Botkit = require('botkit');

var controller = Botkit.teamsbot({
    clientId: config.teams.clientId,
    clientSecret: config.teams.clientSecret,
    studio_token: config.botkit_token
});

controller.setupWebserver(config.teams.port || 3001, function(err, webserver) {
    controller.createWebhookEndpoints(webserver, function() {
        console.log("BOTKIT: Webhooks set up!");
    });
});

// Scenario declarations
var scenario = require('./lib/scenario.js');
controller = scenario.run(controller);

