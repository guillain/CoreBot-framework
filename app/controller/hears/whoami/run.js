// Exports controller function as scenario
exports.run = function(controller, config) {
    if (config.controller.hears.whoami.enable === true) {
        controller.hears('who am i', ['direct_message', 'direct_mention'], function (bot, message) {
            bot.reply(message,
                'You are ' + message.user
                + ' and your email is ' + message.data.personEmail
                + ' and your user id is ' + message.data.personId);
        });
    }
    return controller;
};


