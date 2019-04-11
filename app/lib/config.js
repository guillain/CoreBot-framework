// Load required library
var Log = require(__basedir + 'lib/log');
var File = require(__basedir + 'lib/file');
var fs = require('fs');
var path = require('path');
var _ = require("underscore");
var merge_json = require("merge-json");
var jsonQuery = require('json-query')

// Get the configuration
module.exports = function() {
    Log.debug("lib config");

    // Get principal configuration file
    var config = require(__basedir + 'conf/config.json');

    // Check if configuration files must be added
    _.each(config.file, function(conf, index){
        if (fs.existsSync(__basedir + conf)) {
            config = merge_json.merge(require(__basedir + conf) , config);
            Log.info("lib config conf " + conf + " enable");
        }
        else Log.error("lib config conf " + conf + " disable");
    });

    // Load default conf if validated in the config file
    var load_controller_listener = {};
    if (config.default.load_controller_listener === true) {
        // Search all default.json files in the controller folder and load it
        Log.debug('config controller load_controller_listener');
        load_controller_listener = load_default_listener(__basedir + 'controller', 'default.json', config['controller']);
        config = merge_json.merge(load_controller_listener, config);
    }

    // Load controller conf if validated in the config file
    var load_controller_conf = {};
    if (config.default.load_controller_conf === true) {
        // Search all default.json files in the controller folder and load it
        Log.info('config controller load_controller_conf');
        load_controller_conf = load_default_conf(config,__basedir + 'controller', 'conf.json');
        config = merge_json.merge(load_controller_conf, config);
    }

    // Besure of the botkit token presence
    if (!config.controller.on.hasOwnProperty('botkit')) {
        config.controller.on.botkit = {};
        config.controller.on.botkit.enable = false;
    }
    if (!config.controller.on.botkit.hasOwnProperty('token')) {
        config.controller.on.botkit.token = '';
    }

    // Replace var conf value with env var
    config = load_var_env_conf(config);

    //Log.debug('config\n' + JSON.stringify(config, null, 4));
    /*
    Log.debug('@@@@@@@@@@@@config\n' + JSON.stringify(config.controller.hears));
    Log.debug('config user\n' + JSON.stringify(config.user, null, 4));
    Log.debug('config access_list\n' + JSON.stringify(config.access_list, null, 4));
    Log.debug('config launcher\n' + JSON.stringify(config.launcher, null, 4));
    Log.debug('config controller\n' + JSON.stringify(config.controller, null, 4));
    Log.debug('config load_controller_conf\n' + JSON.stringify(load_controller_conf, null, 4));
    Log.debug('config load_controller_listener\n' + JSON.stringify(load_controller_listener, null, 4));
    */

    return config;
};

load_default_listener = function(folder, file, config_controllers){
    var config = {
        "controller": {
            "hears": {},
            "on": {},
            "action": {}
        }
    };

    // Search all default.json files in the controller folder and load it
    var re = new RegExp(file);
    File.search_file(folder, re, function (filename) {

        // Retrieve "hear" controller priority or set it to default value
		var p = path.dirname(filename).split(path.sep)
        var mod_name = p.pop();
		var controller_type = p.pop();
		var mod_file = require(filename);

        if (mod_file.listener) {
            _.each(mod_file.listener, function (conf, index) {
                Log.debug('lib config load_from_folder mod_name:' + mod_name + ' - index:' + index);

                var control = mod_file.listener[index].controller;
                if (!control) Log.error('lib config controller listener is missing ' + index);
                else {
                    config.controller[control][mod_name] = mod_file;
                    Log.info('lib config controller listener ' + control + ' ' + index);
                }
            });
        } else Log.error('lib default.json controller listener is missing ' + index);

        // Set default value from template
        if (controller_type === "hears") {
		    var template_controllers_hears = require(__basedir + 'conf/default/template_controllers_hears.json');
		    config.controller[controller_type][mod_name] = merge_json.merge(template_controllers_hears, config.controller[controller_type][mod_name])
        }
    });
    return config;
};

load_default_conf = function(config, folder, file){
    var new_config = {
        "controller": {
            "hears": {},
            "on": {},
            "action": {}
        }
    };

    // Search all default.json files in the controller folder and load it
    var re = new RegExp(file);
    File.search_file(folder, re, function (filename) {

        var mod_name = path.dirname(filename).split(path.sep).pop();
        var mod_file = require(filename);
        _.each(config.controller, function (conf, control) {
            if (config.controller[control][mod_name]) {
                Log.debug('lib config load_default_conf mod_name:' + mod_name + ' - control:' + control);

                new_config.controller[control][mod_name] = mod_file;
            }
        });
    });
    return new_config;
};

// export config_controller_hears_hello_msg='{ "help": ["Salut,", "tout le mmonde!"], "ok": "tout va bien", "ko": "tout va mal"}'
load_var_env_conf = function(config) {
    // Loop over env var
    _.each(process.env, (value, key) => {
        var regex = /^config_(access_list|controller|launcher|user|default|file|log|db|message)/g;
        if ( (key.match(regex)) && (jsonQuery(key.replace(/_/g,'.'), {data: config})) ){
            var string_key = key.replace(/^config_/,'');
            var string_value = value.replace(/u\\\\'/g,'"').replace(/\\\\'/g,'"').replace(/\'/g,'');

            var json_string = '{ "' + string_key.replace(/_/g, '": {"') + '": ' + JSON.stringify(JSON.parse(string_value));
            for (i=0; i<string_key.split('_').length; i++) json_string += '}';
            config = merge_json.merge(config, JSON.parse(json_string));
        }
    });
    return config;
};

