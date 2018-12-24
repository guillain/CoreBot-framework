// Load the required libraries
let mod_loader = require(__basedir + 'module/loader.js');

// Exports controller function as scenario
module.exports = function(controller, config) {
    if (config.controller.on.direct_message.enable === true) {
        controller.on('direct_message', function (bot, message) {
            require(__basedir + 'module/loader.js')(controller, 'direct_message', message, bot, config);
        });
    }
    return controller;
};

