// Load require libraries
let Log = require(__basedir + 'lib/log');

// Exports controller function as scenario
exports.message_received = function(controller, bot, message, config) {
    require(__basedir + 'lib/controller_action.js')(controller, config.controller.on.message_received.listener.message_received.from, message, bot, config)
};
