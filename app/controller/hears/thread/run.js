// Load CoreBot libraries
var Log = require(__basedir + 'lib/log');

// Exports controller function as scenario
exports.thread_new = function(controller, bot, message, config, mod_conf) {
    bot.replyAsNewThread(message, mod_conf.msg.welcome);
};

exports.thread_key = function(controller, bot, message, config, mod_conf) {
    bot.replyWithThreadKey(message, {
        threadKey: mod_conf.key,
        requestBody: {
            text: mod_conf.msg.text
        }
    });
};
