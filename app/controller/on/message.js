/*
 * ChatBot scenario for botkit
 * @Target: conversation translated automatically
 * @Author: guillain (guillain.sanchez@dimensiondata.com)
 */

// Load the required libraries
var libloader = require('../../lib/libloader.js');
var xml = require('@xmpp/xml');

// Exports controller function as scenario
exports.run = function(controller) {
    controller.on('message_received', function (bot, message) {
        libloader.run(controller, 'message_received', message, bot)
    });
    controller.on('direct_message', function (bot, message) {
        libloader.run(controller, 'direct_message', message, bot)
    });

    controller.on('group_message', function (bot, message) {
        if (message.text['0'] === config.name)         { message.text.splice(0,1); }
        libloader.run(controller, 'group_message', message, bot)
    });

    return controller;
};


