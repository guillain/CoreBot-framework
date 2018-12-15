// Configuration
let config = require('../../config');

// Load the required libraries
let libloader = require('../../module/loader.js');
let xml = require('@xmpp/xml');

// Exports controller function as scenario
exports.run = function(controller) {
    if (config.on.mention.direct_mention === 1) {
        controller.on('direct_mention', function (bot, message) {
            if (message.text['0'] === config.name) {
                message.text.splice(0, 1);
            }
            libloader.run(controller, 'direct_mention', message, bot)
        });
    }
    return controller;
};
