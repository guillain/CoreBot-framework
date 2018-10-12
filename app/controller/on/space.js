/*
 * ChatBot scenario for botkit
 * @Target: conversation translated automatically
 * @Author: guillain (guillain.sanchez@dimensiondata.com)
 */

// Configuration
var config = require('../../config');

// Load the required libraries
var logstash = require('../../lib/logstash.js');
var translate = require('../../lib/translate.js');
var xml = require('@xmpp/xml');

// Exports controller function as scenario
exports.run = function(controller) {
    controller.on('user_space_join', function(bot, message) {
        if (config.debug == 1) bot.reply(message, "::user_space_join:: " + message.user + " says " + message.text);
        logstash.send('user_space_join', message);
        bot.reply(message, config.msg.welcome);
    });

    controller.on('user_space_leave', function(bot, message) {
        if (config.debug == 1) bot.reply(message, "::user_space_leave:: " + message.user + " says " + message.text);
        logstash.send('user_space_leave', message);
        bot.reply(message, config.msg.bye);
    });

    controller.on('bot_space_join', function(bot, message) {
        if (config.debug == 1) bot.reply(message, "::bot_space_join:: " + message.user + " says " + message.text);
        logstash.send('bot_space_join', message);
        bot.reply(message, config.msg.join);
    });

    return controller;
};


