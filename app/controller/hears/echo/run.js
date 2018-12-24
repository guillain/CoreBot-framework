
// Exports controller function as scenario
module.exports = function(controller, config) {
    if (config.controller.hears.echo.enable === true) {
        controller.hears('^echo', ['direct_mention', 'direct_message', 'self_message'], function (bot, message) {
            if (message.user !== config.user) {
                bot.reply(message, message.text);
            }
        });
    }
    return controller;
};
