// Load require libraries
let tools = require(__basedir + 'lib/tools');

// Exports controller function as scenario
exports.direct_mention = function(controller, bot, message, config) {
    if (message.text['0'] === config.name) {
        message.text.splice(0, 1);
    }
    require(__basedir + 'module/loader.js')(controller, config.controller.on.direct_mention.listener.direct_mention.from, message, bot, config)
};
