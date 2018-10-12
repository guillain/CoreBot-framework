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
    controller.on('message_received', function (bot, message) {
        if (config.debug == 1) bot.reply(message, "::message_received:: " + message.text);
        logstash.send('message_received', message);
        translate.switcher(bot, message);
    });
    controller.on('direct_message', function (bot, message) {
        if (config.debug == 1) bot.reply(message, "::direct_message:: " + message.user + " says " + message.text);
        logstash.send('direct_message', message);
        translate.switcher(bot, message);
    });

    controller.on('group_message', function (bot, message) {
        if (config.debug == 1) bot.reply(message, "::group_message:: " + message.user + " says " + message.text);
        if (message.text['0'] === config.name)         { message.text.splice(0,1); }
        logstash.send('group_message', message);
        translate.switcher(bot, message);
    });

    return controller;
};


