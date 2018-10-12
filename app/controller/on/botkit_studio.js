/*
 * ChatBot scenario for botkit
 * @Target: conversation translated automatically
 * @Author: guillain (guillain.sanchez@dimensiondata.com)
 */

// Configuration
var config = require('../../config');

// Exports controller function as scenario
exports.run = function(controller) {
    if (config.botkit_token) {
        controller.on('direct_message,direct_mention', function(bot, message) {
            controller.studio.runTrigger(bot, message.text, message.user, message.channel).then(function(convo) {
                if (!convo) {
                    // console.log('NO STUDIO MATCH');
                } else {
                    // found a conversation
                }
            }).catch(function(err) {
                console.error('Error with Botkit Studio: ', err);
            });
        });
    }

    return controller;
};


