// Load tools library
let tools = require(__basedir + 'lib/tools');

// Load required lib
let _ = require("underscore");

// Exports controller function as scenario
exports.run = function(controller, message_type, message_content, bot, config) {
    tools.debug("debug", "module loader " + message_type);

    let conf_merged = config;

    _.each(config.module, function (conf, index) {
        conf_merged = tools.load_config(__basedir + 'module/' + index + '/conf.json', conf_merged);

        if (conf_merged.module[index].enable === true) {
            tools.debug("info", "module loader " + index);
            let mod_run = require(__basedir + 'module/' + index + '/run.js');
            mod_run.run(bot, message_content, conf_merged);
        } else tools.debug("debug", "not module loader " + index);
    });
    return controller;
};
