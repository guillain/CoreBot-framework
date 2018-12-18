// Load the required libraries
let mod_loader = require(__basedir + 'module/loader.js');

// Exports controller function as scenario
exports.run = function(controller, config) {
    if (config.controller.on.mention.direct_mention.enable === true) {
        controller.on('direct_mention', function (bot, message) {
            if (message.text['0'] === config.name) {
                message.text.splice(0, 1);
            }
            mod_loader.run(controller, 'direct_mention', message, bot, config)
        });
    }
    return controller;
};
