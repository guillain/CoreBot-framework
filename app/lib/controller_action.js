// Load tools library
let Log = require(__basedir + 'lib/log');

// Load required lib
let _ = require("underscore");

// Exports controller function as scenario
module.exports = function(controller, message_type, message_content, bot, config) {
    Log.debug("loader controller action ");

    // Loop over each controller's action
    _.each(config.controller.action, function (conf, module) {

        // Load or not the controller
        if (config.controller.action[module].enable === true) {

            let mod_run = require(__basedir + 'controller/action/' + module + '/run.js')(controller, bot, message_content, config);

            Log.info("loader controller action " + module + " enable");

        } else Log.debug("loader controller action " + module + " disable");

    });

    return controller;
};

