// Load the required libraries
let mod_loader = require(__basedir + 'module/loader.js');

// Exports controller function as scenario
module.exports = function(controller, config) {
    if (config.controller.on.user_space_leave.enable === true) {
        controller.on('user_space_leave', function (bot, message) {
            if (config.log.debug === 1) bot.reply(message, "::user_space_leave:: " + message.user + " says " + message.text);
            require(__basedir + 'module/loader.js')(controller, 'user_space_leave', message, bot, config);
        });
    }
    return controller;
};

