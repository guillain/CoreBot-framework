// Load tools library
let tools = require(__basedir + 'lib/tools');

// Load the required libraries
let Botkit = require(__basedir + 'botkit/lib/JabberBot.js');
let xml = require('@xmpp/xml');

exports.run = function(config) {
  tools.debug('debug', 'launcher jabber run");

  // Bot initialisation
  let controller = Botkit({
    json_file_store: config.launcher.jabber.store,
    debug: config.log.debug,
    studio_token: config.controller.on.botkit.token
  });
  let bot = controller.spawn({
    client: {
                jid             : config.launcher.jabber.jid,
                password        : config.launcher.jabber.password,
                host            : config.launcher.jabber.ip,
                port            : config.launcher.jabber.port
    }
  });

  tools.debug('info', 'launcher jabber run ok");

  // Scenario declarations
  let scenario = require(__basedir + 'controller/loader.js');
  controller = scenario.run(controller, config);
  return controller;
};

