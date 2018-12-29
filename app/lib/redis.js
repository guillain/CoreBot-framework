// Load tools library
let Log = require(__basedir + 'lib/log');

// Requirements
let fs = require('fs');
var redis = require("redis");
let client = redis.createClient({detect_buffers: true});

// on connect
client.on('connect', function() {
	Log.debug('lib redis on connect');
});

// on error
client.on("error", function (err) {
	Log.debug('lib redis on error ' + err);
});

// Get data 
exports.get = function(storage, cb) {
	Log.debug('lib redis get ' + storage);

	// Open user storage
	client.hgetall(config.controller.hears.search.storage, function (err, reply) {
		if (err) Log.error('lib redis get ' + err);
		cb(reply);
	});
};

// Set data
exports.set = function(storage, data){
	Log.debug('lib redis set ' + storage);

	client.hmset(storage, data);
};

