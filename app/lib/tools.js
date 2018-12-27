// Configuration
let config = require(__basedir + 'conf/config.json');

// Load required lib
let fs = require('fs');
let _ = require("underscore");

let logger = require('node-logger').createLogger(); // logs to STDOUT
logger.setLevel(config.log.verbosity);
logger.format = function(level, date, message){ return level + ': ' + message;}

let log_file = require('node-logger').createLogger(__basedir + config.log.file);
log_file.setLevel(config.log.verbosity);
log_file.format = function(level, date, message){ return date + ': ' + level +': ' + message; }

// Debug function
exports.debug = function(severity, message, bot = '') {
    if (bot !== '') bot.reply('_'+severity+'_ '+message);

    if (config.log.debug === true) {

        if      (severity === "debug") logger.debug(message);
        else if (severity === "info")  logger.info(message);
        else if (severity === "warn")  logger.warn(message);
        else if (severity === "error") logger.error(message);
        else if (severity === "fatal") logger.fatal(message);

        // console.log(severity + ': ' + message);
    }

    if (config.log.file === '') {
        if      (severity === "debug") log_file.debug(message);
        else if (severity === "info")  log_file.info(message);
        else if (severity === "warn")  log_file.warn(message);
        else if (severity === "error") log_file.error(message);
        else if (severity === "fatal") log_file.fatal(message);
    }
};

// Get User function
exports.get_user = function(message){
    exports.debug('debug', 'tools get_user user:' + message.user + ' jid:' + message.from_jid);

    let user = message.user; //personEmail;
    if(user.indexOf("chat") > -1) user = message.from_jid;
    let usertmp = user.split('@');
    user = usertmp[0];

    exports.debug('debug', 'tools get_user user:' + user);
    return user;
};

// Get CSV data
exports.get_csv_data = function(file, cb) {
    exports.debug('debug', 'tools get_csv_data ' + file);
    fs.readFile(file, function(err, data) {
        if(err) throw err;
        let strs = [];
        let array = data.toString().split("\n");
        for(let i = 0; i < array.length - 1; i++) {
            let lineArr = array[i].split(';');
            strs.push(lineArr);
        }
        cb(strs);
    });
};

// Exports datetime string
exports.toUTCDateTimeString = function(date) {
    let yyyy = date.getUTCFullYear();
    let mm = date.getUTCMonth() < 9 ? "0" + (date.getUTCMonth() + 1) : (date.getUTCMonth() + 1); // getMonth() is zero-based
    let dd = date.getUTCDate() < 10 ? "0" + date.getUTCDate() : date.getUTCDate();
    let hh = date.getUTCHours() < 10 ? "0" + date.getUTCHours() : date.getUTCHours();
    let min = date.getUTCMinutes() < 10 ? "0" + date.getUTCMinutes() : date.getUTCMinutes();
    let ss = date.getUTCSeconds() < 10 ? "0" + date.getUTCSeconds() : date.getUTCSeconds();
    return "".concat(yyyy).concat('-').concat(mm).concat('-').concat(dd).concat('T').concat(hh).concat(':').concat(min).concat(':').concat(ss);
};

// Exports the Jids mentionned
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

