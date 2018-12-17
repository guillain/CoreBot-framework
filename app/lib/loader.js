// Tools to merge global and module, controller or component configuration

// Configuration
let config = require('../config.json');

// Load required lib
let _ = require("underscore");
let merge_json = require("merge-json");

// Exports controller function as scenario
exports.run = function(bot, message_content, type, feature) {
    if (config.log.debug === true) bot.reply('Merge config::'+feature);

    console.log(type + '\n' + feature);

    let local_config = require('../' + type + "/" + feature + '/conf.json');

    if (config.log.debug === true) console.log(local_config);

    let conf_merged = merge_json.merge(local_config, config);

    if (conf_merged[type][feature].enable === true) {
        let feature_run = require('../' + type + "/" + feature + '/run.js');
        feature_run.switcher(bot, message_content);
    }
    if (config.log.debug === true) console.log(conf_merged[type][index]);
};

