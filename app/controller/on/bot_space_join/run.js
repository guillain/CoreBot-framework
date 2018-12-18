// Load the required libraries
let mod_loader = require(__basedir + 'module/loader.js');

// Exports controller function as scenario
exports.run = function(controller, config) {
    if (config.controller.on.bot_space_join.enable === true) {
        controller.on('bot_space_join', function (bot, message) {
            if (config.log.debug === 1) bot.reply(message, "::bot_space_join:: " + message.user + " says " + message.text);
            mod_loader.run(controller, 'bot_space_join', message, bot, config);
        });
    }

    return controller;
};

