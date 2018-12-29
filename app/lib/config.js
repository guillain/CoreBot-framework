// Load tools library
let Log = require(__basedir + 'lib/log');

// Load required lib
let fs = require('fs');
let _ = require("underscore");
let merge_json = require("merge-json");

// Get the configuration
module.exports = function() {
    Log.debug("lib config");

    // Get principal configuration file
    let config = require(global.__basedir + 'conf/config.json');

    // Check if optionnal file is present
    const conf_files = ['access_list', 'user', 'launcher', 'controller'];
    conf_files.forEach(function(conf_file){
        if (fs.existsSync(__basedir + 'conf/' + conf_file + '.json')) {
            config = merge_json.merge(require(__basedir + 'conf/' + conf_file + '.json') , config);
            Log.info("lib config conf_file " + conf_file + " enable");
        }
        else Log.debug("lib config conf_file " + conf_file + " disable");
    });

    // Check if default conf must be loaded if not return conf
    if (config.default_conf !== true) return config;

    // Launcher
    _.each(config.launcher, function(conf, index){
        config = merge_json.merge(require(__basedir + 'launcher/' + index + '/conf.json') , config);
        if (config.launcher[index].enable === true)
            Log.info("lib config launcher " + index + " enable");
        else Log.debug("lib config launcher " + index + " disable");
    });

    // Controllers
    const controllers = ['action','hears','on'];
    controllers.forEach(function(controller){
        _.each(config.controller[controller], function (conf, index) {

            let conf_mod = require(__basedir + 'controller/' + controller + '/' + index + '/conf.json', config);
            config = merge_json.merge(conf_mod, config);

            if (config.controller[controller][index].enable === true)
                Log.info("lib config controller " + controller + " " + index + " enable");
            else Log.debug("lib config controller " + controller + " " + index + " disable");
        });
    });

    //Log.debug('config config ' + JSON.stringify(config));

    return config;
};
