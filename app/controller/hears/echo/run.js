// Load tools library
let Log = require(__basedir + 'lib/log');

// Exports controller function as scenario
exports.echo = function(controller, bot, message, confi, mod_conf) {

    bot.reply(message, message.text);

};
