// Configuration
global.__basedir = __dirname  + '/';

// Load required library
let Log = require(global.__basedir + 'lib/log');

Log.debug('main start');

// Run the launchers
require(global.__basedir + 'lib/launcher.js')();

Log.debug('main done');

