// Configuration
let config = require(__basedir + 'conf/config.json');

// Load required lib
let fs = require('fs');

let logger = require('node-logger').createLogger(); // logs to STDOUT
logger.setLevel(config.log.verbosity);
logger.format = function(level, date, message){ return level + ':' + message; };

let log_file = require('node-logger').createLogger(__basedir + config.log.file);
log_file.setLevel(config.log.verbosity);
log_file.format = function(level, date, message){ return date + ': ' + level + ':' + message; };

// Debug functions

exports.debug = function(message) {
    if (config.log.debug === true) {
        logger.debug(message);
        log_file.debug(message);
    }
};

exports.info = function(message) {
    if (config.log.debug === true) {
        logger.info(message);
        log_file.info(message);
    }
};

exports.warn = function(message) {
    if (config.log.debug === true) {
        logger.warn(message);
        log_file.warn(message);
    }
};

exports.error = function(message) {
    if (config.log.debug === true) {
        logger.error(message);
        log_file.error(message);
    }
};

exports.fatal= function(message) {
    if (config.log.debug === true) {
        logger.fatal(message);
        log_file.error(message);
    }
};
