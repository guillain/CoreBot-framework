// Get configuration
let config = require(global.__basedir + 'conf/config.json');

// Load tools library
let Log = require(__basedir + 'lib/log');

// Load required lib
let _ = require("underscore");
let merge_json = require("merge-json");

// Get the configuration
module.exports = function(launcher) {
    Log.debug("config ");

    // Launcher
    let conf_merged = merge_json.merge(require(__basedir + 'launcher/' + launcher + '/conf.json') , config);
    Log.info("config launcher " + launcher + " enable");

    // Controllers
    const controllers = ['action','hears','on'];
    controllers.forEach(function(controller){
        _.each(config.controller[controller], function (conf, index) {

            let conf_mod = require(__basedir + 'controller/' + controller + '/' + index + '/conf.json', conf_merged);
            conf_merged = merge_json.merge(conf_mod, conf_merged);

            if (conf_merged.controller[controller][index].enable === true)
                Log.info("config controller " + controller + " " + index + " enable");
            else Log.debug("config controller " + controller + " " + index + " disable");
        });
    });

    //Log.debug('config conf_merged ' + JSON.stringify(conf_merged));

    return conf_merged;
};
