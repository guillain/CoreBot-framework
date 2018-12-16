// Configuration
let config = require('../../config');
let Botkit = require('../../botkit/lib/Botkit.js');

// Controller
let controller = Botkit.googlehangoutsbot({
    endpoint: config.hangouts.endpoint,
    token: config.hangouts.token,
    debug: config.debug,
    studio_token: config.botkit_token
});

let bot = controller.spawn({})

controller.setupWebserver(config.hangouts.port || 3002, function (err, webserver) {
    controller.createWebhookEndpoints(webserver, bot, function () {
        console.log("Google Hangouts: Webhooks set up!");
    });
});

// Scenario declarations
let scenario = require('../../controller/loader.js');
controller = scenario.run(controller);
