// Configuration
let config = require('../../config');

// Exports controller function as scenario
exports.run = function(controller) {
    if (config.hears.thread === 1) {
        controller.hears('new thread', 'message_received', function (bot, message) {
            bot.replyAsNewThread(message, `Hello ! this is a new thread`);
        });
        controller.hears('thread key', 'message_received', function (bot, message) {
            bot.replyWithThreadKey(message, {
                threadKey: "YOUR_THREAD_KEY",
                requestBody: {
                    text: `Hi ! this message inside the same thread`
                }
            });
        });
    }
    return controller;
};
