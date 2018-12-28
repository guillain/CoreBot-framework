// Load require libraries
let Log = require(__basedir + 'lib/log');

// Exports controller function as scenario
exports.message_received = function(controller, bot, message, config) {
    require(__basedir + 'lib/controller_action.js')(controller, config.controller.on.user_space_leave.listener.user_space_leave.from, message, bot, config)
};
