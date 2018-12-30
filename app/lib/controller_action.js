// Load required lib
let Log = require(__basedir + 'lib/log');
let Security = require(__basedir + 'lib/security');
let _ = require("underscore");

// Exports controller function as scenario
module.exports = function(controller, message_type, message, bot, config) {
    Log.debug("lib controller action ");

    // Loop over each controller's action
    _.each(config.controller.action, function (conf, module) {

        // Load or not the controller
        if (config.controller.action[module].enable === true) {
            Log.info("lib controller action " + module + " enable");

            if (Security.validation(
                config,
                message,
                config['controller']['action'][module]
            ))
                require(__basedir + 'controller/action/' + module + '/run.js')(controller, bot, message, config);
            else bot.reply(message, config.msg.user_not_allowed);

        } else Log.debug("lib controller action " + module + " disable");

    });

    return controller;
};

