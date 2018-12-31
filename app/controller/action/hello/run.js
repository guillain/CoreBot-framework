// Load tools library
let Log = require(__basedir + 'lib/log');

// Exports controller function as scenario
exports.hello = function(controller, bot, message, config, mod_run) {
    bot.reply(message, mod_run.msg.text);
};
