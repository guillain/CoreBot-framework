// Load tools library
let tools = require(__basedir + 'lib/tools');

// Exports controller function as scenario
exports.cards = function(controller, bot, message, config) {
    bot.reply(message, config.controller.action.hello.msg.text);
};
