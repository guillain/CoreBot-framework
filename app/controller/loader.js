// Load tools library
let tools = require('../lib/tools');

// Load required lib
let _ = require("underscore");

// Exports controller function as scenario
exports.run = function(controller) {
    tools.debug("info", "controller loader");

    let config = tools.load_config();

    _.each(config.controller.hears, function (conf, index) {
        let conf_merged = tools.load_config("../controller/hears/" + index + "/conf.json");

        if (conf_merged.controller.hears[index].enable === true) {
            tools.debug("info","controller loader hears " + index);
            let mod_run = require('./hears/' + index + '/run.js');
            controller = mod_run.run(controller, conf_merged);
        } else tools.debug("debug","not controller loader hears " + index);
    });

    _.each(config.controller.on, function (conf, index) {
        let conf_merged = tools.load_config("../controller/on/" + index + "/conf.json");

        _.each(conf, function (sub_conf, sub_index) {
          if (conf_merged.controller.on[index][sub_index].enable === true) {
              tools.debug("debug","controller loader on " + index);
              let mod_run = require('./on/' + index + '/run.js');
              controller = mod_run.run(controller, conf_merged);
          } else tools.debug("debug","not controller loader on " + index + " " + sub_index);
        });
    });
    return controller;
};
