// Load tools library
let tools = require(__basedir + 'lib/tools');

// Exports controller function as scenario
module.exports = function(controller, config) {
    tools.debug('debug', 'controller on botkit run');

    if (config.controller.on.botkit.token !== '') {
        controller.on('direct_message,direct_mention', function(bot, message) {
            controller.studio.runTrigger(bot, message.text, message.user, message.channel).then(function(convo) {
                if (!convo) {
                    tools.debug('debug', 'controller on botkit run no-studio-match');
                } else {
                    tools.debug('debug', 'controller on botkit run studio-match');
                }
            }).catch(function(err) {
                tools.debug('debug', 'controller on botkit run error' + err);
            });
        });
    }
    return controller;
};


