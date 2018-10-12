/*
 * ChatBot for Google Hangouts
 * @Target: CoreBot generic launcher
 * @Author: guillain (guillain.sanchez@dimensiondata.com)
 */

// Configuration
var config = require('./config');
var Botkit = require('./botkit/lib/Botkit.js');

var controller = Botkit.googlehangoutsbot({
    endpoint: config.hangouts.endpoint,
    token: config.hangouts.token,
    debug: config.debug,
    studio_token: config.botkit_token
});

var bot = controller.spawn({})

controller.setupWebserver(config.hangouts.port || 3002, function (err, webserver) {
    controller.createWebhookEndpoints(webserver, bot, function () {
        console.log("Google Hangouts: Webhooks set up!");
    });
});

// Scenario declarations
var scenario = require('./scenario.js');
controller = scenario.run(controller);

