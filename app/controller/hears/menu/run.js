// Load tools library
let Log = require(__basedir + 'lib/log');

// Search master fct
exports.menu = function(controller, bot, message, config, mod_conf) {
    // Create new conversation
    bot.createConversation(message, function (err, convo) {

        // create a path for when a user says YES
        convo.addMessage({
            text: mod_conf.msg.reply.yes,
        }, 'yes_thread');

        // create a path for when a user says NO
        convo.addMessage({
            text: mod_conf.msg.reply.no,
        }, 'no_thread');

        // create a path where neither option was matched
        // this message has an action field,
        // which directs botkit to go back to the `default` thread after sending this message.
        convo.addMessage({
            text: mod_conf.msg.reply.bad,
            action: 'default',
        }, 'bad_reply');

        // Create a yes/no question in the default thread...
        convo.addQuestion(mod_conf.msg.question, [
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
                    delay: mod_conf.delay*1000});

        convo.on('end', function (convo) {
            if (convo.status === 'completed') {
                // do something useful with the users responses
                let res = convo.extractResponses();

                // reference a specific response by key
                let value = convo.extractResponse('key');

                // ... do more stuff...
                convo.say({text: mod_conf.msg.end});
            } else {
                // something happened that caused the conversation to stop prematurely
            }
        });

        convo.onTimeout(function (convo) {
            convo.say(mod_conf.msg.timeout);
            convo.next();
        });

        // now set the conversation in motion...
        convo.activate();
    });
};
