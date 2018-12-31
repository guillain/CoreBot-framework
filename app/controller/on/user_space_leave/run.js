// Load require libraries
let Log = require(__basedir + 'lib/log');

// Exports controller function as scenario
exports.message_received = function(controller, bot, message, config, mod_conf) {
    require(__basedir + 'lib/controller.js')(controller, config, ['action'], message, bot);
};
