// Load tools library
let tools = require('../lib/tools');

// Load required lib
let _ = require("underscore");

// Exports controller function as scenario
exports.run = function(controller, message_type, message_content, bot) {
    tools.debug("info",
                message + "::" + message_type + "::" + message.user + "::says::" + message.text, bot);

    let config = tools.load_config();

    _.each(config.module, function (conf, index) {
        tools.debug("debug","module::" + index + '\n' + conf, bot);

        let conf_merged = tools.load_config("./module/" + index + "/conf.json", bot);

        if (conf_merged.module[index].enable === true) {
            let mod_run = require('./' + index + '/run.js');
            mod_run.switcher(bot, message_content, config);
        }
    });
    return controller;
};
