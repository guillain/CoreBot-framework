/*
 * ChatBot scenario for botkit
 * @Target: conversation translated automatically
 * @Author: guillain (guillain.sanchez@dimensiondata.com)
 */

// Configuration
var config = require('../config');

// Load the required libraries
var xml = require('@xmpp/xml');

// Exports controller function as scenario
exports.run = function(controller, message_type, message_content, bot) {
    if (config.debug == 1) bot.reply(message, "::" + message_type + "::" + message.user + "::says::" + message.text);

    if (config.translate.enable == true) {
        var translate = require('./translate.js');
        translate.switcher(bot, message_content);
    }

    if (config.autoreply.enable == true) {
        var autoreply = require('./autoreply.js');
        autoreply.switcher(bot, message_content);
    }

    if (config.bigdata.enable == true) {
        var logstash = require('./logstash.js');
        logstash.send(message_type, message_content);
    }

    return controller;
};


