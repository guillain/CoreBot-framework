// Load tools library
let tools = require(__basedir + 'lib/tools');

// Requirements
let fs = require('fs');
var redis = require("redis");
let client = redis.createClient({detect_buffers: true});

// CSV
exports.run = function(bot, message, config) {
    tools.debug('debug', 'module csv run');

    // Remove first pattern if: present + prefixed=true
    let msg_arr = message.text.split(' ');
    if (!(/^csv$/i.test(msg_arr['0'])) && (config.module.translate.prefixed === true)){
        tools.debug('debug', 'module translate run return');
        return;
    }

    if (/^csv$/i.test(msg_arr['0'])) {
        tools.debug('debug', 'module csv run mod-name-del');
        msg_arr.shift();
    }

    // order action according to the message content   
    if (/^help$/i.test(msg_arr['0'])) 
        bot.reply(message, config.module.csv.msg.help.join('\n'));
    else if (/^get$/i.test(msg_arr['0'])) 
        exports.get_data(bot, message, config, __basedir + config.module.csv.file);
    else if (/^load$/i.test(msg_arr['0'])) 
        exports.load_in_db(bot, message, config);
    else if (/^test$/i.test(msg_arr['0'])) 
        exports.test_db_csv(bot, message, config);

};

// DB functions
// on connect
client.on('connect', function() {
    tools.debug('info', 'module csv client on connect');
});

// on error
client.on("error", function (err) {
    tools.debug('info', 'module csv client on error ' + err);
});

// CSV functions 
exports.get_data = function(bot, message, config, file){
    tools.debug('debug', 'module csv get_data');

    exports.get_csv_data_cb(bot, message, file, config, function(csv_data) {
        if (csv_data !== '') res = config.module.csv.msg.get.ok;
        else                 res = config.module.csv.msg.get.ko;
        bot.reply(message, '\n\n- ' + csv_data.join("\n\n- "));
    });
};

exports.get_csv_data_cb = function(bot, message, file, config, cb) {
    get_csv_data(file, function(csv_data) {
        cb(csv_data);
    });
};

exports.load_in_db = function(bot, message, config){
    tools.debug('debug', 'module csv load_in_db');

    // Parse CSV file and set value in redis
    fs.readFile(__basedir + config.module.csv.file, function(err, data) {
        if(err) throw err;
        var strs = [];
        var array = data.toString().split("\n");
        for(i = 0; i < array.length - 1; i++) {
            lineArr = array[i].split(';');
            strs.push(lineArr[0], lineArr[1]);
        }
        client.del(config.module.csv.storage, redis.print);
        client.hmset(config.module.csv.storage, strs, redis.print, function (err, reply) {
            if(err) {
               tools.debug('error', 'module csv get_csv_data_cb ' + err);
               throw err;
            }
        });

        if (i>0) res = config.module.csv.msg.load.ok;
        else     res = config.module.csv.msg.load.ko;
        bot.reply(message, res + '\n\nNumber of row imported: ' + i);
    });
};

exports.test_db_csv = function(bot, message, config) {
    tools.debug('debug', 'module csv test_db_csv');

    exports.get_csv_data_cb(bot, message, __basedir + config.module.csv.file, config, function(csv_data) {
        let csv_data_length = 0;
        if (csv_data !== '') csv_data_length = csv_data.length;

        client.get(config.module.csv.storage, function (err, km) {
            console.log('>>>>>> err', err);
            console.log('>>>>>>  km' , km);
            if(err) {
                 km = [];
                 tools.debug('error', 'module csv test_db_csv ' + err);
            }
            if (csv_data_length !== km.length)
                 res = config.module.csv.msg.test.ok;
            else res = config.module.csv.msg.test.ko;
            bot.reply(message, res + '\n\nFile: ' + csv_data_length + ' - Db: ' + km.length);
        });
    });
};

get_csv_data = function(file, cb) {
    tools.debug('debug', 'module csv get_csv_data ' + file);

    fs.readFile(file, function(err, data) {
        if(err) throw err;
        let strs = [];
        let array = data.toString().split("\n");
        for(let i = 0; i < array.length - 1; i++) {
            let lineArr = array[i].split(';');
            strs.push(lineArr);
        }
        cb(strs);
    });
};

