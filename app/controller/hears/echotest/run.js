// Load the required libraries
let stz = require(__basedir + 'component/stanza/stanza.js');

// Exports controller function as scenario
exports.run = function(controller, config) {
    if (config.controller.hears.echotest.enable === true) {
        controller.hears('^echotest', ['direct_mention', 'direct_message', 'self_message'], function (bot, message) {
            if (message.user !== config.user) {
                bot.reply(message, message.text);
            }
        });
    }
    return controller;
};
