// Load require libraries
let tools = require(__basedir + 'lib/tools');

// Exports controller function as scenario
exports.message_received = function(controller, bot, message, config) {
    require(__basedir + 'controller/action/loader.js')(controller, config.controller.on.user_space_leave.listener.user_space_leave.from, message, bot, config)
};
