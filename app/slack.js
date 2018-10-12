/*
 * ChatBot for Cisco Webex teams (old Cisco Spark)
 * @Target: CoreBot generic launcher
 * @Author: guillain (guillain.sanchez@dimensiondata.com)
 */

// Configuration
var config = require('./config');
var Botkit = require('./botkit/lib/Botkit.js');

var controller = Botkit.slackbot({
    debug: true,
    studio_token: config.botkit_token
});

var bot = controller.spawn({
    token: config.slack.token
}).startRTM();


// Scenario declarations
var scenario = require('./scenario.js');
controller = scenario.run(controller);

