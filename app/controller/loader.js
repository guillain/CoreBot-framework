// Load tools library
let tools = require('../lib/tools');

// Load required lib
let _ = require("underscore");

// Exports controller function as scenario
exports.run = function(controller) {
    tools.debug("info", "controller:loader", bot);

    let config = tools.load_config();

    _.each(config.controller.hears, function (conf, index) {
        tools.debug("debug","controller::hears::" + index + '\n' + conf, bot);

        let conf_merged = tools.load_config("./controller/hears/" + index + "/conf.json", bot);

        if (conf_merged.controller.hears[index].enable === true) {
            let mod_run = require('./hears/' + index + '/run.js');
            controller = mod_run.run(controller, conf_merged);
        }
    });

    _.each(config.controller.on, function (conf, index) {
        tools.debug("debug","controller::on::" + index + '\n' + conf, bot);

        let conf_merged = tools.load_config("./controller/on/" + index + "/conf.json", bot);

        if (conf_merged.controller.on[index].enable === true) {
            let mod_run = require('./on/' + index + '/run.js');
            controller = mod_run.run(controller, conf_merged);
        }
    });
    return controller;
};
