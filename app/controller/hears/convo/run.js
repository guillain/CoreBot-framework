// Exports controller function as scenario
exports.run = function(bot, controller,  config) {
    if (config.controller.hears.convo.enable === true) {
        controller.hears('convo', 'message_received', function (bot, message) {
            bot.startConversation(message, function (err, convo) {
                convo.ask(config.controller.hears.convo.msg.ask, [
                    {
                        pattern: bot.utterances.yes,
                        callback: function (response, convo) {
                            convo.say(config.controller.hears.convo.msg.say.yes);
                            convo.next();
                        }
                    },
                    {
                        pattern: bot.utterances.no,
                        default: true,
                        callback: function (response, convo) {
                            convo.say(config.controller.hears.convo.msg.say.no);
                            convo.next();
                        }
                    }
                ]);
            });

        });
    }
    return controller;
};
