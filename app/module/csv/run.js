// Requirements
let fs = require('fs');

// CSV
exports.run = function(bot, message, config) {
    // order action according to the message content
    let msg_arr = message.text.split(' ');
    if      (/^help$/i.test(msg_arr['0'])) bot.reply(message, config.module.csv.msg.help);
    else if (/^get$/i.test(msg_arr['0']))     {
        exports.get_data(bot, message, file, config, function(csv_data) {
            if (csv_data !== '') bot.reply(message, config.module.csv.msg.get.ok + csv_data.split('\n- '));
            else bot.reply(message, config.module.csv.msg.get.ko);
        });
    }
    else if (/^load$/i.test(msg_arr['0']))    {
        let res = exports.load_in_db(bot, message, config);
        if (res !== '')
            bot.reply(message, config.module.csv.msg.load.ok + res.split('\n- '));
        else
            bot.reply(message, config.module.csv.msg.load.ko);
    }
    else if (/^test$/i.test(msg_arr['0']))    {
        let res = exports.test_db_csv(bot, message, config);
        if (res !== '')
            bot.reply(message, config.module.csv.msg.test.ok + res.split('\n- '));
        else
            bot.reply(message, config.module.csv.msg.test.ko);
    }
};

// CSV functions loader
exports.get_data = function(bot, message, file, config, cb){
    get_csv_data(file, function(csv_data) {
        cb(csv_data);
    });
};

exports.load_in_db = function(bot, message, config){
    // Parse CSV file and set value in redis
    fs.readFile(__basedir + config.module.csv.file, function(err, data) {
        if(err) throw err;
        var strs = [];
        var array = data.toString().split("\n");
        for(i = 0; i < array.length - 1; i++) {
            lineArr = array[i].split(';');
            strs.push(lineArr[0], lineArr[1]);
            //console.log('>>> i:'+i+', key:'+lineArr[0]+', txt:'+lineArr[1]);
        }
        client.del(config.module.csv.storage, redis.print);
        client.hmset(config.module.csv.storage, strs, redis.print);
        bot.reply(message, 'Nb of row imported:'+i);
    });
};

exports.test_db_csv = function(bot, config) {
    exports.get_data(bot, message, __basedir + config.module.csv.file, config, function(csv_data) {
        let csv_data_length = 0;
        if (csv_data !== '') csv_data_length = csv_data.length;

        client.get(csv_data_length, function (err, km) {
            if (km) { bot.reply(message, '- Row ' + csv_data_length + ' found:' + km); }
            else { bot.reply(message, '- Row ' + csv_data_length + ' not found'); }
        });

        client.hget(config.module.csv.storage, csv_data_length, function (err, kms) {
            if (kms) { bot.reply(message, '- Row '+config.module.csv.storage+' found:'+kms); }
            else { bot.reply(message, '- Row '+config.module.csv.storage+' not found'); }
        });
    });
};

get_csv_data = function(file, cb) {
    console.log('debug: get_csv_data file ' + file);
    console.log(__basedir);
 
    fs.readFile(file, function(err, data) {
        if(err) throw err;
        let strs = [];
        let array = data.toString().split("\n");
        for(let i = 0; i < array.length - 1; i++) {
            let lineArr = array[i].split(';');
            strs.push(lineArr);
        }
        cb(strs)
    });
};
