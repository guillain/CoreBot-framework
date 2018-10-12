/*
 * ChatBot for Jabber
 * @Target: CoreBot generic launcher
 * @Author: guillain (guillain.sanchez@dimensiondata.com)
 */

// Configuration
var config = require('./config');

// Load the required libraries
var Botkit = require('./botkit/lib/JabberBot.js');

// Bot initialisation
var controller = Botkit({
    json_file_store: config.jabber.store,
    debug: config.debug,
    studio_token: config.botkit_token
});
var bot = controller.spawn({
        client: {
                jid             : config.jabber.jid,
                password        : config.jabber.password,
                host            : config.jabber.ip,
                port            : config.jabber.port
        }
});

// Scenario declarations
var scenario = require('./scenario.js');
controller = scenario.run(controller);

