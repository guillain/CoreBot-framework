// Configuration
global.__basedir = __dirname  + '/';
let Log = require(global.__basedir + 'lib/log');
let conf = require(global.__basedir + 'conf/config.json');

Log.debug('main start');
//var debug = require('debug')('CoreBot-framework:main');

// Run the launchers
let launcher = require(global.__basedir + 'lib/launcher.js');
launcher.run(conf.launcher);

Log.debug('main done');

