// Configuration
var config = require('../../config');
var Botkit = require('../../botkit/lib/Botkit.js');

var controller = Botkit.teamsbot({
    clientId: config.launcher.teams.clientId,
    clientSecret: config.launcher.teams.clientSecret,
    studio_token: config.botkit_token
});

controller.setupWebserver(config.launcher.teams.port || 3001, function(err, webserver) {
    controller.createWebhookEndpoints(webserver, function() {
        console.log("Microsoft Teams: Webhooks set up!");
    });
});

// Scenario declarations
var scenario = require('../../controller/loader.js');
controller = scenario.run(controller);

