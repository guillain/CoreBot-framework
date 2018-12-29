// Load tools library
let Log = require(__basedir + 'lib/log');

// Load the required libraries
//let Botkit = require(__basedir + 'botkit/lib/JabberBot.js');
const Botkit = require('./lib/JabberBot.js');

let xml = require('@xmpp/xml');

module.exports = function(config) {
  Log.debug('launcher jabber run');

  // Bot initialisation
  let controller = Botkit({
    json_file_store: __basedir + config.launcher.jabber.store,
    debug: config.log.debug,
    studio_token: config.controller.on.botkit.token,
  });
  let bot = controller.spawn({
    client: {
                jid             : config.launcher.jabber.jid,
                password        : config.launcher.jabber.password,
                host            : config.launcher.jabber.ip,
                port            : config.launcher.jabber.port
    }
  });

  Log.info('launcher jabber run ok');

  // Scenario declarations
  controller = require(__basedir + 'lib/controller.js')(controller, config);

  return controller;
};

