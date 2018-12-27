// Load require libraries
let tools = require(__basedir + 'lib/tools');

// Exports controller function as scenario
exports.botkit = function(controller, bot, message, config) {
    controller.studio.runTrigger(bot, message.text, message.user, message.channel).then(function(convo) {
        if (!convo) {
            tools.debug('debug', 'controller on botkit no-studio-match');
        } else {
            tools.debug('debug', 'controller on botkit studio-match');
        }
    }).catch(function(err) {
        tools.debug('debug', 'controller on botkit error' + err);
    });
};
