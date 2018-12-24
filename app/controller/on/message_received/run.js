// Load the required libraries
let mod_loader = require(__basedir + 'module/loader.js');

// Exports controller function as scenario
module.exports = function(controller, config) {
    if (config.controller.on.message_received.enable === true) {
        controller.on('message_received', function (bot, message) {
            require(__basedir + 'module/loader.js')(controller, 'message_received', message, bot, config);
        });
    }
    return controller;
};

