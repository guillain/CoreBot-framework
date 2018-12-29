// Get configuration
let config = require(global.__basedir + 'conf/config.json');

// Load tools library
let tools = require(__basedir + 'lib/tools');

// Load required lib
let _ = require("underscore");
let merge_json = require("merge-json");

// Get the configuration
module.exports = function(launcher) {
    tools.debug("debug", "config ");

    // Launcher
    let conf_merged = merge_json.merge(require(__basedir + 'launcher/' + launcher + '/conf.json') , config);
    tools.debug("info", "config launcher " + launcher + " enable");

    // Controllers
    const controllers = ['action','hears','on'];
    controllers.forEach(function(controller){
        _.each(config.controller[controller], function (conf, index) {

            let conf_mod = require(__basedir + 'controller/' + controller + '/' + index + '/conf.json', conf_merged);
            conf_merged = merge_json.merge(conf_mod, conf_merged);

            if (conf_merged.controller[controller][index].enable === true)
                tools.debug("info", "config controller " + controller + " " + index + " enable");
            else tools.debug("debug", "config controller " + controller + " " + index + " disable");
        });
    });

    //tools.debug('debug', 'config conf_merged ' + JSON.stringify(conf_merged));

    return conf_merged;
};
