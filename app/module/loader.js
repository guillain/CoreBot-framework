// Load tools library
let tools = require('../lib/tools');

// Load required lib
let _ = require("underscore");

// Exports controller function as scenario
exports.run = function(controller, message_type, message_content, bot) {
    tools.debug("info", "controller loader " + " " + message_type + " " + message_content);

    let config = tools.load_config();

    _.each(config.module, function (conf, index) {
        let conf_merged = tools.load_config("../module/" + index + "/conf.json");

        if (conf_merged.module[index].enable === true) {
            tools.debug("info", "module loader " + index);
            let mod_run = require('./' + index + '/run.js');
            mod_run.switcher(bot, message_content, config);
        } else tools.debug("debug", "not module loader " + index);
    });
    return controller;
};
