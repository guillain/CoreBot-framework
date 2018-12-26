// Load tools library
let tools = require(__basedir + 'lib/tools');

// Exports controller function as scenario
exports.convo = function(bot, message, config) {
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
