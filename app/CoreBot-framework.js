var path = require('path');

// Configuration
global.__basedir = __dirname  + path.sep;

// Load required library
var Log = require(global.__basedir + 'lib/log');

Log.debug('main start');

// Run the launchers
require(global.__basedir + 'lib/launcher.js')();

Log.debug('main done');

