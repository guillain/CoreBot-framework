// Load the required libraries
let mod_loader = require(__basedir + 'module/loader.js');

// Exports controller function as scenario
exports.run = function(controller, config) {
    if (config.controller.on.group_message.enable === true) {
        controller.on('group_message', function (bot, message) {
            if (message.text['0'] === config.name) {
                message.text.splice(0, 1);
            }
            mod_loader.run(controller, 'group_message', message, bot, config);
        });
    }

    return controller;
};

