// Load tools library
let tools = require(__basedir + 'lib/tools');

// Requirements
let fs = require('fs');
var redis = require("redis");
let client = redis.createClient({detect_buffers: true});

// on connect
client.on('connect', function() {
	tools.debug('debug', 'lib redis on connect');
});

// on error
client.on("error", function (err) {
	tools.debug('debug', 'lib redis on error ' + err);
});

// Get data 
exports.get = function(storage, cb) {
	tools.debug('debug', 'lib redis get ' + storage);

	// Open user storage
	client.hgetall(config.controller.hears.search.storage, function (err, reply) {
		if (err) tools.debug('error', 'lib redis get ' + err);
		cb(reply);
	});
};

// Set data
exports.set = function(storage, data){
	tools.debug('debug', 'lib redis set ' + storage);

	client.hmset(storage, data);
};

