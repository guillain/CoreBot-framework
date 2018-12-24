// Load tools library
let tools = require(__basedir + 'lib/tools');

// Load required lib
let _ = require("underscore");

// Exports launcher
exports.run = function(launcher) {
    tools.debug("debug", "launcher loader ");

    _.each(launcher, function (conf, index) {
        // Get the appropriate configuration
        let config = require(__basedir + 'lib/config.js')(index);

        if (config.launcher[index].enable === true) {

            let mod_run = require(__basedir + 'launcher/' + index + '/run.js')(config);

            tools.debug("info", "launcher " + index + " enable");

        } else tools.debug("debug", "launcher " + index + " disable");
    });
};
