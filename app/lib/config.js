// Load required library
let Log = require(__basedir + 'lib/log');
let File = require(__basedir + 'lib/file');
let fs = require('fs');
let path = require('path');
let _ = require("underscore");
let merge_json = require("merge-json");

// Get the configuration
module.exports = function() {
    Log.debug("lib config");

    // Get principal configuration file
    let config = require(__basedir + 'conf/config.json');

    // Check if configuration files must be added
    _.each(config.file, function(conf, index){
        if (fs.existsSync(__basedir + conf)) {
            config = merge_json.merge(require(__basedir + conf) , config);
            Log.info("lib config conf " + conf + " enable");
        }
        else Log.error("lib config conf " + conf + " disable");
    });

    // Load default conf if validated in the config file
    let load_controller_listener = {};
    if (config.default.load_controller_listener === true) {
        // Search all default.json files in the controller folder and load it
        Log.debug('config controller load_controller_listener');
        load_controller_listener = load_default_listener(__basedir + 'controller', 'default.json');
        config = merge_json.merge(load_controller_listener, config);
    }
    
    // Load controller conf conf if validated in the config file
    let load_controller_conf = {};
    if (config.default.load_controller_conf === true) {
        // Search all default.json files in the controller folder and load it
        Log.info('config controller load_controller_conf');
        load_controller_conf = load_default_conf(config,__basedir + 'controller', 'conf.json');
        config = merge_json.merge(load_controller_conf, config);
    }
    
    //Log.debug('config\n' + JSON.stringify(config, null, 4));
    /*
    Log.debug('config user\n' + JSON.stringify(config.user, null, 4));
    Log.debug('config access_list\n' + JSON.stringify(config.access_list, null, 4));
    Log.debug('config launcher\n' + JSON.stringify(config.launcher, null, 4));
    Log.debug('config controller\n' + JSON.stringify(config.controller, null, 4));
    Log.debug('config load_controller_conf\n' + JSON.stringify(load_controller_conf, null, 4));
    Log.debug('config load_controller_listener\n' + JSON.stringify(load_controller_listener, null, 4));
    */
    return config;
};

load_default_listener = function(folder, file){
    let config = {
        "controller": {
            "hears": {},
            "on": {},
            "action": {}
        }
    };
    
    // Search all default.json files in the controller folder and load it
    let re = new RegExp(file);
    File.search_file(folder, re, function (filename) {
        
        let mod_name = path.dirname(filename).split(path.sep).pop();
        let mod_file = require(filename);
    
        if (mod_file.listener) {
            _.each(mod_file.listener, function (conf, index) {
                Log.debug('lib config load_from_folder mod_name:' + mod_name + ' - index:' + index);
                
                let control = mod_file.listener[index].controller;
                if (!control) Log.error('lib config controller listener is missing ' + index);
                else {
                    config.controller[control][mod_name] = mod_file;
                    Log.info('lib config controller listener ' + control + ' ' + index);
                }
            });
        }
        else Log.error('lib config controller listener is missing ' + index);
    });
    return config;
};

load_default_conf = function(config, folder, file){
    let new_config = {
        "controller": {
            "hears": {},
            "on": {},
            "action": {}
        }
    };
    
    // Search all default.json files in the controller folder and load it
    let re = new RegExp(file);
    File.search_file(folder, re, function (filename) {
        
        let mod_name = path.dirname(filename).split(path.sep).pop();
        let mod_file = require(filename);
        _.each(config.controller, function (conf, control) {
            if (config.controller[control][mod_name]) {
                Log.debug('lib config load_default_conf mod_name:' + mod_name + ' - control:' + control);
                
                new_config.controller[control][mod_name] = mod_file;
            }
        });
    });
    return new_config;
};