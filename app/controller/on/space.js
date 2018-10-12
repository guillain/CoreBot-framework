/*
 * ChatBot scenario for botkit
 * @Target: conversation translated automatically
 * @Author: guillain (guillain.sanchez@dimensiondata.com)
 */

// Load the required libraries
var libloader = require('../../lib/libloader.js');
var xml = require('@xmpp/xml');

// Exports controller function as scenario
exports.run = function(controller) {
    controller.on('user_space_join', function(bot, message) {
        if (config.debug == 1) bot.reply(message, "::user_space_join:: " + message.user + " says " + message.text);
        libloader.run(controller, 'user_space_join', message, bot)
    });

    controller.on('user_space_leave', function(bot, message) {
        if (config.debug == 1) bot.reply(message, "::user_space_leave:: " + message.user + " says " + message.text);
        libloader.run(controller, 'user_space_leave', message, bot)
    });

    controller.on('bot_space_join', function(bot, message) {
        if (config.debug == 1) bot.reply(message, "::bot_space_join:: " + message.user + " says " + message.text);
        libloader.run(controller, 'bot_space_join', message, bot)
    });

    return controller;
};


