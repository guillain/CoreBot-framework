// Load tools library
let tools = require(__basedir + 'lib/tools');

// Load required lib
let _ = require("underscore");

// Exports launcher
exports.run = function(config) {
    tools.debug("debug", "launcher loader ");

    _.each(config.launcher, function (conf, index) {
        let conf_merged = tools.load_config(__basedir + 'launcher/' + index + '/conf.json', config);

        if (conf_merged.launcher[index].enable === true) {
            tools.debug("info", "launcher loaded " + index);

            let mod_run = require(__basedir + 'launcher/' + index + '/run.js');
            mod_run.run(conf_merged);

        } else tools.debug("debug", "launcher not loaded " + index);
    });
};
