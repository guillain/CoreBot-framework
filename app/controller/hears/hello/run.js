// Load CoreBot libraries
var Log = require(__basedir + 'lib/log');

// Exports controller function as scenario
exports.hello= function(controller, bot, message, config, mod_conf) {
    var to_say = 'Hello ' + message.user;

    bot.reply(message, to_say);
};
