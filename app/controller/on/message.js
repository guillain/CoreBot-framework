// Configuration
let config = require('../../config');

// Load the required libraries
let libloader = require('../../module/loader.js');
let xml = require('@xmpp/xml');

// Exports controller function as scenario
exports.run = function(controller) {
    if (config.on.message.message_received === 1) {
        controller.on('message_received', function (bot, message) {
            libloader.run(controller, 'message_received', message, bot)
        });
    }

    if (config.on.message.direct_message === 1) {
        controller.on('direct_message', function (bot, message) {
            libloader.run(controller, 'direct_message', message, bot)
        });
    }

    if (config.on.message.group_message === 1) {
        controller.on('group_message', function (bot, message) {
            if (message.text['0'] === config.name) {
                message.text.splice(0, 1);
            }
            libloader.run(controller, 'group_message', message, bot)
        });
    }

    return controller;
};


