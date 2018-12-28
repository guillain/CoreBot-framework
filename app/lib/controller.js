// Load tools library
let Log = require(__basedir + 'lib/log');

// Load required lib
let _ = require("underscore");

// Exports controller function as scenario
module.exports = function(controller, config) {
    Log.debug("loader controller ");

    // Loop over each controller
    const controls = ['hears','on'];
    controls.forEach(function(control){

        // Loop over each controller's module
        _.each(config['controller'][control], function (conf, module) {

            // Load or not the controller
            if (config['controller'][control][module].enable === true) {
                Log.info("loader controller " + control + " " + module + " enable");

                // Load the 'on' and 'hears' controllers
                let mod_run = require(__basedir + 'controller/' + control + '/' + module + '/run.js');
                _.each(config['controller'][control][module].listener, function (conf, index) {

                    if (control === 'hears') {
                        controller.hears(
                            config['controller'][control][module].listener[index].pattern,
                            config['controller'][control][module].listener[index].from,
                            function (bot, message) {
                                mod_run[index](controller, bot, message, config);
                            });
                    } else if (control === 'on') {
                        controller.on(
                            config['controller'][control][module].listener[index].from,
                            function (bot, message) {
                                mod_run[index](controller, bot, message, config);
                            });
                    }
                });
            }
            else Log.debug("loader controller " + control + " " + module + " disable");
        });
    });
    return controller;
};
