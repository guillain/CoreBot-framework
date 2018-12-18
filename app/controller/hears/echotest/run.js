// Load the required libraries
let stz = require(__basedir + 'component/stanza/run.js');

// Exports controller function as scenario
exports.run = function(controller, config) {
    if (config.controller.hears.echotest.enable === true) {
        controller.hears('^test', ['direct_mention', 'direct_message', 'self_message'], function (bot, message) {
            stz.msg(bot, message);
        });
    }
    return controller;
};
