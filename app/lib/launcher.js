// Load tools library
let Log = require(__basedir + 'lib/log');

// Load required lib
let _ = require("underscore");

// Exports launcher
exports.run = function(launcher) {
    Log.debug("lib launcher ");

    // Loop over each controller's module
    _.each(launcher, function (conf, index) {

        // Get the appropriate configuration
        let config = require(__basedir + 'lib/config.js')(index);

        // Load or not the controller
        if (config.launcher[index].enable === true) {
            Log.info("lib launcher " + index + " enable");

            let mod_run = require(__basedir + 'launcher/' + index + '/run.js')(config);

        } else Log.debug("lib launcher " + index + " disable");
    });
};
