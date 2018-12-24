// Configuration
global.__basedir = __dirname  + '/';
let tools = require(global.__basedir + 'lib/tools');
let conf = require(global.__basedir + 'conf/config.json');

tools.debug('debug', 'main start');
//var debug = require('debug')('CoreBot-framework:main');

// Run the launchers
let launcher = require(global.__basedir + 'launcher/loader.js');
launcher.run(conf.launcher);

tools.debug('debug', 'main done');

