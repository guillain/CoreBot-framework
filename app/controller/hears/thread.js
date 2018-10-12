/*
 * ChatBot scenario for botkit
 * @Target: on thread managment
 * @Author: guillain (guillain.sanchez@dimensiondata.com)
 */

// Configuration
var config = require('../../config');

// Exports controller function as scenario
exports.run = function(controller) {

    controller.hears('new thread', 'message_received', function (bot, message) {
        bot.replyAsNewThread(message, `Hello ! this is a new thread`);
    });
    controller.hears('thread key', 'message_received', function (bot, message) {
        bot.replyWithThreadKey(message, {
            threadKey : "YOUR_THREAD_KEY",
            requestBody : {
                text : `Hi ! this message inside the same thread`
            }
        });
    });

    return controller;
};


