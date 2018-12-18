// Configuration
global.__basedir = __dirname  + '/';
let config = require(global.__basedir + 'config.json');
let Botkit = require(global.__basedir + 'botkit/lib/Botkit.js');

// Run the launchers
let launcher = require(global.__basedir + 'launcher/loader.js');
launcher.run(config);


