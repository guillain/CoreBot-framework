// Load require libraries
let Log = require(__basedir + 'lib/log');

// Exports controller function as scenario
exports.botkit = function(controller, bot, message, config) {
    controller.studio.runTrigger(bot, message.text, message.user, message.channel).then(function(convo) {
        if (!convo) {
            Log.debug('controller on botkit no-studio-match');
        } else {
            Log.debug('controller on botkit studio-match');
        }
    }).catch(function(err) {
        Log.debug('controller on botkit error' + err);
    });
};
