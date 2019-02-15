// Load tools library
var Log = require(__basedir + 'lib/log');

// Requirements
var fs = require('fs');
var redis = require("redis");
var client = redis.createClient({detect_buffers: true});

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
    client.get(storage, function (err, reply) {
        if (err) Log.error('lib redis get ' + err);
        cb(reply);
    });
};
exports.hgetall = function(storage, cb) {
    Log.debug('lib redis hgetall ' + storage);

    // Open user storage
    client.hgetall(storage, function (err, reply) {
        if (err) Log.error('lib redis hgetall ' + err);
        cb(reply);
    });
};

// Set data
exports.set = function(storage, data){
    Log.debug('lib redis set ' + storage);

    client.set(storage, data);
};
exports.set_json = function(storage, data){
    Log.debug('lib redis set ' + storage);
    client.set(storage, JSON.stringify(data), () => {});
};
exports.hmset = function(storage, data){
    Log.debug('lib redis hmset ' + storage);
    client.hmset(storage, data, redis.print, function (err, reply) {
        if(err) {
            Log.error('lib redis hmset ' + err);
            throw err;
        }
    });
};

// Del data
exports.del = function(storage){
    Log.debug('lib redis del ' + storage);
    client.del(storage, redis.print);
};
