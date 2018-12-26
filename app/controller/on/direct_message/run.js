// Load require libraries
let tools = require(__basedir + 'lib/tools');

// Exports controller function as scenario
exports.direct_message = function(controller, bot, message, config) {
    require(__basedir + 'module/loader.js')(controller, config.controller.on.direct_message.listener.direct_message.from, message, bot, config);
};
