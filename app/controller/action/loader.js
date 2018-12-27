// Load tools library
let tools = require(__basedir + 'lib/tools');

// Load required lib
let _ = require("underscore");

// Exports controller function as scenario
module.exports = function(controller, message_type, message_content, bot, config) {
    tools.debug("debug", "controller action " + message_type);

    _.each(config.module, function (conf, index) {

        if (config.module[index].enable === true) {

            let mod_run = require(__basedir + 'controller/action/' + index + '/run.js')(bot, message_content, config);

            tools.debug("info", "controller action " + index + " enable");

        } else tools.debug("debug", "controller action " + index + " disable");

    });

    return controller;
};

