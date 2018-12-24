// Load the required libraries
let mod_loader = require(__basedir + 'module/loader.js');

// Exports controller function as scenario
module.exports = function(controller, config) {
    if (config.controller.on.direct_mention.enable === true) {
        controller.on('direct_mention', function (bot, message) {
            if (message.text['0'] === config.name) {
                message.text.splice(0, 1);
            }
            require(__basedir + 'module/loader.js')(controller, 'direct_mention', message, bot, config)
        });
    }
    return controller;
};
