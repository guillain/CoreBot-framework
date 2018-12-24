// Exports controller function as scenario
module.exports = function(controller, config) {
    if (config.controller.on.bot_space_join.enable === true) {
        controller.on('bot_space_join', function (bot, message) {
            if (config.log.debug === 1) bot.reply(message, "::bot_space_join:: " + message.user + " says " + message.text);
            require(__basedir + 'module/loader.js')(controller, 'bot_space_join', message, bot, config);
        });
    }

    return controller;
};

