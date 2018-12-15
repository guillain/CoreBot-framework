// Configuration
let config = require('../../config');

// Load the required libraries
let libloader = require('../../module/loader.js');
let xml = require('@xmpp/xml');

// Exports controller function as scenario
exports.run = function(controller) {
    if (config.on.space.user_space_join === 1) {
        controller.on('user_space_join', function (bot, message) {
            if (config.debug === 1) bot.reply(message, "::user_space_join:: " + message.user + " says " + message.text);
            libloader.run(controller, 'user_space_join', message, bot)
        });
    }

    if (config.on.space.user_space_leave === 1) {
        controller.on('user_space_leave', function (bot, message) {
            if (config.debug === 1) bot.reply(message, "::user_space_leave:: " + message.user + " says " + message.text);
            libloader.run(controller, 'user_space_leave', message, bot)
        });
    }

    if (config.on.space.bot_space_join === 1) {
        controller.on('bot_space_join', function (bot, message) {
            if (config.debug === 1) bot.reply(message, "::bot_space_join:: " + message.user + " says " + message.text);
            libloader.run(controller, 'bot_space_join', message, bot)
        });
    }

    return controller;
};


