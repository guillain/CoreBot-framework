// Load tools library
let Log = require(__basedir + 'lib/log');

// Exports controller function as scenario
exports.echo = function(controller, bot, message, config) {

    bot.reply(message, message.text);

};
