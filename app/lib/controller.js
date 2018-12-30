// Load required lib
let Log = require(__basedir + 'lib/log');
let Security = require(__basedir + 'lib/security');
let _ = require("underscore");

// Run the controller listener
run = function(controller, bot, message, config, listener_name, listener, script){
    Log.debug("lib controller run " + listener_name);
    
    // Security validation (ACL, priv, perm)
    if (Security.validation(config, message, listener)) {
        let mod_run = require(script);
        let message_tmp = exports.remove_pattern(config, message, listener);
        mod_run[listener_name](controller, bot, message_tmp, config);
    }
    else bot.reply(message, config.msg.user_not_allowed);
};

// Run the on and hears controller
module.exports = function(controller, config, controls, message = '', bot = '') {
    Log.debug("lib controller on_hears ");

    // Loop over each controller
    // ie : controls = ['hears','on'];
    controls.forEach(function(control){

        // Loop over each controller's module
        _.each(config['controller'][control], function (conf, module) {

            // Load or not the controller
            if (config['controller'][control][module].enable === true) {
                Log.info("lib controller " + control + " " + module + " enable");

                // Loop on each listener of the controller module
                _.each(config['controller'][control][module].listener, function (conf, index) {

                    if (control === 'hears') {
                        controller.hears(
                            config['controller'][control][module].listener[index].pattern,
                            config['controller'][control][module].listener[index].from,
                            function (bot, message) {
                                run(controller, bot, message, config, index,
                                            config['controller'][control][module].listener[index],
                                            __basedir + 'controller/' + control + '/' + module + '/run.js'
                                );
                            }
                        );
                    }
                    else if (control === 'on') {
                        controller.on(
                            config['controller'][control][module].listener[index].from,
                            function (bot, message) {
                                run(controller, bot, message, config, index,
                                            config['controller'][control][module].listener[index],
                                            __basedir + 'controller/' + control + '/' + module + '/run.js'
                                );
                            }
                        );
                    }
                    else if (control === 'action') {
                        run(controller, bot, message, config, index,
                            config['controller'][control][module].listener[index],
                            __basedir + 'controller/' + control + '/' + module + '/run.js'
                        );
                    }
                    else Log.error('lib controller wrong control ' + control)
                });
            }
            else Log.debug("lib controller " + control + " " + module + " disable");
        });
    });
    return controller;
};

// Remove the configured pattern from the text message
exports.remove_pattern = function(config, message, listener){
    let bool_to_remove = (listener.remove_pattern) ? listener.remove_pattern : config.default_remove_pattern;
    if (bool_to_remove !== true) return message;
    
    listener.pattern.forEach(function(pattern) {
        let re = new RegExp(pattern,"g");
        message.text = message.text.replace(re, '');
    });
    
    Log.debug('lib controller remove_pattern ' + message.text);
    return message;
};
