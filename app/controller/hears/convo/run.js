// Load tools library
let tools = require(__basedir + 'lib/tools');

// Exports controller function as scenario
module.exports = function(controller, config) {
    tools.debug('debug', 'controller hears convo');

    if (config.controller.hears.convo.enable === true) {
        //controller.hears('convo', 'message_received', function (bot, message) {
        controller.hears('convo', ['message_received', 'direct_message', 'direct_mention', 'group_message'], function (bot, message) {
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
