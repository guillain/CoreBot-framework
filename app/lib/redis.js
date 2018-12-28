// Load tools library
let tools = require(__basedir + 'lib/tools');

// Requirements
let fs = require('fs');
var redis = require("redis");
let client = redis.createClient({detect_buffers: true});

// on connect
client.on('connect', function() {
    tools.debug('debug', 'redis client on');
});

// on error
client.on("error", function (err) {
    tools.debug('debug', 'redis client error ' + err);
});

// Get data 
exports.get = function(storage, cb) {
  tools.debug('debug', 'redis');

  // Open user storage
  client.get(storage, function(err, reply) {
    if (reply) cb(reply);
    if (err) tools.debug('error', 'redis get');
  });
};

// Set data
exports.set = function(storage, data){
    client.set(storage, data);
};

