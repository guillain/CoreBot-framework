// Load require libraries
let Log = require(__basedir + 'lib/log');

// Exports controller function as scenario
exports.group_message = function(controller, bot, message, config) {
    if (message.text['0'] === config.name) {
        message.text.splice(0, 1);
    }
    require(__basedir + 'lib/controller_action.js')(controller, config.controller.on.group_message.listener.group_message.from, message, bot, config)
};
