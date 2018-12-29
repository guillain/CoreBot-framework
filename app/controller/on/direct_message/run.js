// Load require libraries
let Log = require(__basedir + 'lib/log');

// Exports controller function as scenario
exports.direct_message = function(controller, bot, message, config) {
    require(__basedir + 'lib/controller_action.js')(controller, config.controller.on.direct_message.listener.direct_message.from, message, bot, config);
};
