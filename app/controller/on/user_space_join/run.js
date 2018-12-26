// Load require libraries
let tools = require(__basedir + 'lib/tools');

// Exports controller function as scenario
exports.message_received = function(controller, bot, message, config) {
    require(__basedir + 'module/loader.js')(controller, config.controller.on.user_space_join.listener.user_space_join.from, message, bot, config)
};
