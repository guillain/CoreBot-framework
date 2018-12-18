// Configuration
let config = require(__basedir + 'config.json');

// Load required lib
let _ = require("underscore");
let merge_json = require("merge-json");

// Debug function
exports.debug = function(severity, message, bot = '') {
    if (config.log.debug === true) {
        if (bot !== '') bot.reply(message);

        if ((config.log.verbosity === "info") && (severity === "info"))
            console.log("info: " + message);
        else if (severity === "debug")
            console.log("debug: " + message);
    }
};

// Exports controller function as scenario
exports.load_config = function(conf_file = '', config = '') {
    //exports.debug("info", "local_config "+conf_file);

    let conf_merged = config;
    if (conf_file !== ''){
        let local_config = require(conf_file);
        conf_merged = merge_json.merge(local_config, config);
    }
    return conf_merged;
};

exports.toUTCDateTimeString = function(date) {
    let yyyy = date.getUTCFullYear();
    let mm = date.getUTCMonth() < 9 ? "0" + (date.getUTCMonth() + 1) : (date.getUTCMonth() + 1); // getMonth() is zero-based
    let dd = date.getUTCDate() < 10 ? "0" + date.getUTCDate() : date.getUTCDate();
    let hh = date.getUTCHours() < 10 ? "0" + date.getUTCHours() : date.getUTCHours();
    let min = date.getUTCMinutes() < 10 ? "0" + date.getUTCMinutes() : date.getUTCMinutes();
    let ss = date.getUTCSeconds() < 10 ? "0" + date.getUTCSeconds() : date.getUTCSeconds();
    return "".concat(yyyy).concat('-').concat(mm).concat('-').concat(dd).concat('T').concat(hh).concat(':').concat(min).concat(':').concat(ss);
};

exports.ExtractMentionJids = function(message) {
    let direct_mention_reg = /href="xmpp:\s?(\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+)\s?"/ig;
    let email_reg = /\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+/i;
    let match = message.stanza.toString().match(direct_mention_reg);
    let mention_jids = [];
    if (match) {
        for (let i = 0; i < match.length; i++) {
            let jid_match = match[i].match(email_reg);
            if (jid_match) {
                let jid = jid_match[0];
                if (jid != bot.client_jid) {
                    mention_jids.push(jid);
                }
            }
        }
    }
    return mention_jids;
};
