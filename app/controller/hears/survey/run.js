// Load tools library
let tools = require(__basedir + 'lib/tools');

// Survey controller hears
module.exports = function(controller, config) {
    tools.debug('debug', 'controller hears survey run');

    if (config.controller.hears.survey.enable === true) {
        controller.hears('^survey', ['message_received', 'direct_message', 'direct_mention', 'group_message'], function (bot, message) {
            bot.createConversation(message, function (err, convo) {

                convo.addMessage({
                    text: config.controller.hears.survey.msg.reply.yes,
                }, 'thread_1_yes');

                convo.addMessage({
                    text: config.controller.hears.survey.msg.reply.no,
                }, 'thread_1_no');
                convo.addMessage({
                    text: config.controller.hears.survey.msg.reply.bad,
                    action: 'default',
                }, 'thread_1_bad_response');

                convo.addQuestion(config.controller.hears.survey.msg.question, [
                    {
                        pattern: '^y$|yes|oui|ya',
                        callback: function (response, convo) {
                            convo.gotoThread('thread_1_yes');
                        },
                    },
                    {
                        pattern: '^n$,no|non|nein',
                        callback: function (response, convo) {
                            convo.gotoThread('thread_1_no');
                        },
                    },
                    {
                        default: true,
                        callback: function (response, convo) {
                            convo.gotoThread('thread_1_bad_response');
                        },
                    }
                ], {}, 'default');

                convo.say({text: 'I waited 3 seconds to tell you this...',
                            delay: config.controller.hears.survey.delay*1000});

                convo.on('end', function (convo) {
                    if (convo.status === 'completed') {
                        // do something useful with the users responses
                        let res = convo.extractResponses();

                        // reference a specific response by key
                        let value = convo.extractResponse('key');

                        // ... do more stuff...
                        convo.say({text: config.controller.hears.survey.msg.end});
                    } else {
                        // something happened that caused the conversation to stop prematurely
                    }
                });

                convo.onTimeout(function (convo) {
                    convo.say(config.controller.hears.survey.msg.timeout);
                    convo.next();
                });

                // now set the conversation in motion...
                convo.activate();
            });
        });
    }
    return controller;
};

