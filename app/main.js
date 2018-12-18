// Configuration
global.__basedir = __dirname  + '/';
let tools = require(__basedir + 'lib/tools');
let Botkit = require(global.__basedir + 'botkit/lib/Botkit.js');

tools.debug('debug', 'main');

// ToDo: move the full files loading here
let config = require(global.__basedir + 'config.json');

// Run the launchers
let launcher = require(global.__basedir + 'launcher/loader.js');
launcher.run(config);


