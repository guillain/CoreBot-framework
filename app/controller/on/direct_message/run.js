// Load require libraries
let Log = require(__basedir + 'lib/log');

// Exports controller function as scenario
exports.direct_message = function(controller, bot, message, config) {
    require(__basedir + 'lib/controller.js')(controller, config, ['action'], message, bot);
};
