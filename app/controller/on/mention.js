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
    controller.on('direct_mention', function (bot, message) {
        if (message.text['0'] === config.name)         { message.text.splice(0,1); }
        libloader.run(controller, 'direct_mention', message, bot)
    });

    return controller;
};


