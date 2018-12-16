// Configuration
let config = require('../../config');
let Botkit = require('../../botkit/lib/Botkit.js');

let controller = Botkit.slackbot({
    debug: config.debug,
    studio_token: config.botkit_token
});

let bot = controller.spawn({
    token: config.slack.token
}).startRTM();


// Scenario declarations
let scenario = require('../../controller/loader.js');
controller = scenario.run(controller);
