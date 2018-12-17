// Load the required libraries
let mod_loader = require('../../../module/loader.js');

// Exports controller function as scenario
exports.run = function(controller, config) {
    if (config.controller.on.space.user_space_join.enable === true) {
        controller.on('user_space_join', function (bot, message) {
            if (config.debug === 1) bot.reply(message, "::user_space_join:: " + message.user + " says " + message.text);
            mod_loader.run(controller, 'user_space_join', message, bot)
        });
    }

    if (config.controller.on.space.user_space_leave.enable === true) {
        controller.on('user_space_leave', function (bot, message) {
            if (config.debug === 1) bot.reply(message, "::user_space_leave:: " + message.user + " says " + message.text);
            mod_loader.run(controller, 'user_space_leave', message, bot)
        });
    }

    if (config.controller.on.space.bot_space_join.enable === true) {
        controller.on('bot_space_join', function (bot, message) {
            if (config.debug === 1) bot.reply(message, "::bot_space_join:: " + message.user + " says " + message.text);
            mod_loader.run(controller, 'bot_space_join', message, bot)
        });
    }

    return controller;
};
