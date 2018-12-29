// Load require libraries
let Log = require(__basedir + 'lib/log');

// Exports controller function as scenario
exports.direct_mention = function(controller, bot, message, config) {
    require(__basedir + 'lib/controller_action.js')(controller, config.controller.on.bot_space_join.listener.bot_space_join.from, message, bot, config)
};
