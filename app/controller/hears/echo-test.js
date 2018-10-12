/*
 * ChatBot scenario for botkit
 * @Target: conversation translated automatically
 * @Author: guillain (guillain.sanchez@dimensiondata.com)
 */

// Configuration
var config = require('../../config');

// Load the required libraries
var stz = require('../../lib/stanza.js');

// Exports controller function as scenario
exports.run = function(controller) {
    controller.hears('^test', ['direct_mention', 'direct_message', 'self_message'], function (bot, message) {
	stz.msg(bot,message);
    });
    return controller;
};


