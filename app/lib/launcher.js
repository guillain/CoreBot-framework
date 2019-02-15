// Load tools library
var Log = require(__basedir + 'lib/log');

// Load required lib
var _ = require("underscore");

// Exports launcher
module.exports = function() {
    Log.debug("lib launcher ");

    // Get the configuration
    let config = require(__basedir + 'lib/config.js')();

    // Loop over each controller's module
    _.each(config.launcher, function (conf, index) {

        // Load or not the controller
        if (config.launcher[index].enable === true) {
            Log.info("lib launcher " + index + " enable");

            let mod_run = require(__basedir + 'launcher/' + index + '/run.js')(config);

        } else Log.debug("lib launcher " + index + " disable");
    });
};
