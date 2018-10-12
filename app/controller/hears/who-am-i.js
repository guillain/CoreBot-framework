/*
 * ChatBot scenario for botkit
 * @Target: conversation translated automatically
 * @Author: guillain (guillain.sanchez@dimensiondata.com)
 */

// Configuration
var config = require('../../config');

// Exports controller function as scenario
exports.run = function(controller) {

    controller.hears('who am i', ['direct_message', 'direct_mention'], function(bot, message) {
          bot.reply(message,'You are ' + message.user + ' and your email is ' + message.data.personEmail + ' and your user id is ' + message.data.personId);
    });

    return controller;
};


