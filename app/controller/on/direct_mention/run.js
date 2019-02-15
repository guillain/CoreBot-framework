// Load require libraries
var Log = require(__basedir + 'lib/log');

// Exports controller function as scenario
exports.direct_mention = function(controller, bot, message, config, mod_run) {
    if (message.text['0'] === config.name) {
        message.text.splice(0, 1);
    }
    require(__basedir + 'lib/controller.js')(controller, config, ['action'], message, bot);
};
