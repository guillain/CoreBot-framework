// Load the required libraries
let mod_loader = require(__basedir + 'module/loader.js');

// Exports controller function as scenario
exports.run = function(controller, config) {
    if (config.controller.on.message.message_received.enable === true) {
        controller.on('message_received', function (bot, message) {
            mod_loader.run(controller, 'message_received', message, bot, config);
        });
    }

    if (config.controller.on.message.direct_message.enable === true) {
        controller.on('direct_message', function (bot, message) {
            mod_loader.run(controller, 'direct_message', message, bot, config);
        });
    }

    if (config.controller.on.message.group_message.enable === true) {
        controller.on('group_message', function (bot, message) {
            if (message.text['0'] === config.name) {
                message.text.splice(0, 1);
            }
            mod_loader.run(controller, 'group_message', message, bot, config);
        });
    }

    return controller;
};


