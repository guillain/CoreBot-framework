// Load require libraries
let tools = require(__basedir + 'lib/tools');

// Exports controller function as scenario
exports.direct_mention = function(controller, bot, message, config) {
    require(__basedir + 'controller/action/loader.js')(controller, config.controller.on.bot_space_join.listener.bot_space_join.from, message, bot, config)
};
