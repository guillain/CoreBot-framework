// Load tools library
let tools = require(__basedir + 'lib/tools');

// Load required lib
let _ = require("underscore");

// Exports controller function as scenario
module.exports = function(controller, config) {
    tools.debug("debug", "controller loader");

    // Run each controller
    const controls = ['hears','on'];
    controls.forEach(function(control){

        _.each(config['controller'][control], function (conf, index) {

            if (config['controller'][control][index].enable === true) {

                let mod_run = require(__basedir + 'controller/' + control + '/' + index + '/run.js')(controller, config);

                tools.debug("info","controller " + control + " " + index + " enable");

            } else tools.debug("debug","controller " + control + " " + index + " disable");
        });
    });

    return controller;
};
