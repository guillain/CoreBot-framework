// Load tools library
let tools = require(__basedir + 'lib/tools');

// Load required lib
let _ = require("underscore");

// Exports controller function as scenario
exports.run = function(controller, config) {
    tools.debug("info", "controller loader");

    let conf_merged = config;

    // Merge and create one global conf
    _.each(config.controller.hears, function (conf, index) {
        conf_merged = tools.load_config(__basedir + 'controller/hears/' + index + "/conf.json", conf_merged);
    });
    _.each(config.controller.on, function (conf, index) {
        conf_merged = tools.load_config(__basedir + 'controller/on/' + index + "/conf.json", conf_merged);
    });

    // Run each controller
    let i = 0;
    _.each(config.controller.hears, function (conf, index) {
        console.log('>>>>', i++, index);
        if (conf_merged.controller.hears[index].enable === true) {
            tools.debug("info","controller loader hears " + index);
            let mod_run = require(__basedir + 'controller/hears/' + index + '/run.js');
            controller = mod_run.run(controller, conf_merged);
        } else tools.debug("debug","not controller loader hears " + index);
    });
    i = 0;
    _.each(config.controller.on, function (conf, index) {
        console.log('>>>>', i++, index);
        if (conf_merged.controller.on[index].enable === true) {
            tools.debug("debug","controller loader on " + index);
            let mod_run = require(__basedir + 'controller/on/' + index + '/run.js');
            controller = mod_run.run(controller, conf_merged);
        } else tools.debug("debug","not controller loader on " + index);
    });

    return controller;
};
