// Load tools library
let tools = require(__basedir + 'lib/tools');

// Search master fct
module.exports = function(controller, config) {
    tools.debug('debug', 'controller hears menu run');

    if (config.controller.hears.menu.enable === true) {
        controller.hears('^menu', ['message_received', 'direct_message', 'direct_mention', 'group_message'], function (bot, message) {
            bot.createConversation(message, function (err, convo) {

                // create a path for when a user says YES
                convo.addMessage({
                    text: config.controller.hears.menu.msg.reply.yes,
                }, 'yes_thread');

                // create a path for when a user says NO
                convo.addMessage({
                    text: config.controller.hears.menu.msg.reply.no,
                }, 'no_thread');

                // create a path where neither option was matched
                // this message has an action field,
                // which directs botkit to go back to the `default` thread after sending this message.
                convo.addMessage({
                    text: config.controller.hears.menu.msg.reply.bad,
                    action: 'default',
                }, 'bad_reply');

                // Create a yes/no question in the default thread...
                convo.addQuestion(config.controller.hears.menu.msg.question, [
                    {
                        pattern: 'yes|oui|ya',
                        callback: function (response, convo) {
                            convo.gotoThread('yes_thread');
                        },
                    },
                    {
                        pattern: 'no|non|nein',
                        callback: function (response, convo) {
                            convo.gotoThread('no_thread');
                        },
                    },
                    {
                        default: true,
                        callback: function (response, convo) {
                            convo.gotoThread('bad_reply');
                        },
                    }
                ], {}, 'default');

                convo.say({text: 'I waited 3 seconds to tell you this...',
                            delay: config.controller.hears.menu.delay*1000});

                convo.on('end', function (convo) {
                    if (convo.status === 'completed') {
                        // do something useful with the users responses
                        let res = convo.extractResponses();

                        // reference a specific response by key
                        let value = convo.extractResponse('key');

                        // ... do more stuff...
                        convo.say({text: config.controller.hears.menu.msg.end});
                    } else {
                        // something happened that caused the conversation to stop prematurely
                    }
                });

                convo.onTimeout(function (convo) {
                    convo.say(config.controller.hears.menu.msg.timeout);
                    convo.next();
                });

                // now set the conversation in motion...
                convo.activate();
            });
        });
    }
    return controller;
};

