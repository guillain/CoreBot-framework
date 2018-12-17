// Exports controller function as scenario
exports.run = function(controller, config) {
    if (config.controller.hears.thread.enable === true) {
        controller.hears('new thread', 'message_received', function (bot, message) {
            bot.replyAsNewThread(message, config.controller.hears.thread.msg.welcome);
        });
        controller.hears('thread key', 'message_received', function (bot, message) {
            bot.replyWithThreadKey(message, {
                threadKey: "YOUR_THREAD_KEY",
                requestBody: {
                    text: config.controller.hears.thread.msg.text
                }
            });
        });
    }
    return controller;
};
