// Load tools library
let tools = require(__basedir + 'lib/tools');

// Exports controller function as scenario
exports.echo = function(bot, message, config) {

    bot.reply(message, message.text);

};
