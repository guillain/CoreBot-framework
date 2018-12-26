// Load CoreBot libraries
let tools = require(__basedir + 'lib/tools');

// Exports controller function as scenario
exports.thread_new = function(controller, bot, message, config) {
    bot.replyAsNewThread(message, config.controller.hears.thread.msg.welcome);
);

exports.thread_key = function(controller, bot, message, config) {
    bot.replyWithThreadKey(message, {
        threadKey: config.controller.hears.thread.key,
        requestBody: {
            text: config.controller.hears.thread.msg.text
        }
    });
};
