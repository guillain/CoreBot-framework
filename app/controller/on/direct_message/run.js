// Load the required libraries
let mod_loader = require(__basedir + 'module/loader.js');

// Exports controller function as scenario
exports.run = function(controller, config) {
    if (config.controller.on.direct_message.enable === true) {
        controller.on('direct_message', function (bot, message) {
            mod_loader.run(controller, 'direct_message', message, bot, config);
        });
    }
    return controller;
};

