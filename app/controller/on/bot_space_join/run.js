// Load require libraries
var Log = require(__basedir + 'lib/log');

// Exports controller function as scenario
exports.bot_space_join = function(controller, bot, message, config, mod_run) {
    require(__basedir + 'lib/controller.js')(controller, config, ['action'], message, bot);
};
