// Configuration
let config = require('../../config');

// Load the required libraries
let Botkit = require('../../botkit/lib/JabberBot.js');
let xml = require('@xmpp/xml');

// Bot initialisation
let controller = Botkit({
    json_file_store: config.launcher.jabber.store,
    debug: config.debug,
    studio_token: config.botkit_token
});
let bot = controller.spawn({
        client: {
                jid             : config.launcher.jabber.jid,
                password        : config.launcher.jabber.password,
                host            : config.launcher.jabber.ip,
                port            : config.launcher.jabber.port
        }
});

// Scenario declarations
let scenario = require('../../controller/loader.js');
controller = scenario.run(controller);
