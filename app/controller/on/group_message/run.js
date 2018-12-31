// Load require libraries
let Log = require(__basedir + 'lib/log');

// Exports controller function as scenario
exports.group_message = function(controller, bot, message, config, mod_conf) {
    if (message.text['0'] === config.name) {
        message.text.splice(0, 1);
    }
    require(__basedir + 'lib/controller.js')(controller, config, ['action'], message, bot);
};
