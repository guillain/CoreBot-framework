// Load tools library
let tools = require(__basedir + 'lib/tools');

// Load required lib
let _ = require("underscore");

// Exports controller function as scenario
module.exports = function(controller, message_type, message_content, bot, config) {
    tools.debug("debug", "module loader " + message_type);

    _.each(config.module, function (conf, index) {

        if (config.module[index].enable === true) {

            let mod_run = require(__basedir + 'module/' + index + '/run.js')(bot, message_content, config);

            tools.debug("info", "module " + index + " enable");

        } else tools.debug("debug", "module " + index + " disable");

    });

    return controller;
};
