// Load tools library
let Log = require(__basedir + 'lib/log');

// Exports controller function as scenario
exports.convo = function(controller, bot, message, config) {
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
};
