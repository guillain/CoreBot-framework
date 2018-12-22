// Configuration
global.__basedir = __dirname  + '/';
let tools = require(__basedir + 'lib/tools');
tools.debug('debug', 'main');

// ToDo: move the full files loading here
let config = require(global.__basedir + 'conf/config.json');

// Run the launchers
let launcher = require(global.__basedir + 'launcher/loader.js');
launcher.run(config);


