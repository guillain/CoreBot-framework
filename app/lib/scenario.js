/*
 * ChatBot scenario for botkit
 * @Target: dedicated scenario for this integration
 * @Author: guillain (guillain.sanchez@dimensiondata.com)
 */

// Exports controller function as scenario
exports.run = function(controller) {
    // **Hears** import
    var convo = require('../controller/hears/convo.js')
    controller = convo.run(controller)

    var cards = require('../controller/hears/cards.js')
    controller = cards.run(controller)

    var thread = require('../controller/hears/thread.js')
    controller = thread.run(controller)

    var echotest = require('../controller/hears/echo-test.js')
    controller = echotest.run(controller)

    var whoami = require('../controller/hears/who-am-i.js')
    controller = whoami.run(controller);

    // **On** import
    var mention = require('../controller/on/mention.js')
    controller = mention.run(controller);

    var message = require('../controller/on/message.js')
    controller = message.run(controller);

    var space = require('../controller/on/space.js')
    controller = space.run(controller);

    var ctr_botkit_studio = require('../controller/on/botkit_studio.js')
    controller = ctr_botkit_studio.run(controller);

    return controller;
};


