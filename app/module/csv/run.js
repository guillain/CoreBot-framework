// Load tools library
let tools = require(__basedir + 'lib/tools');

// Requirements
let fs = require('fs');
var redis = require("redis");
let client = redis.createClient({detect_buffers: true});
let fullTextSearch = require('full-text-search');

// CSV
module.exports = function(bot, message, config) {
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
    else if (/^search$/i.test(msg_arr['0'])){
        msg_arr.shift();
        exports.search_in_csv(bot, message, config, __basedir + config.module.csv.file, msg_arr.join(' '));
    }
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

exports.search_in_csv = function(bot, message, config, file, data){
    tools.debug('debug', 'module csv get_data');

    let data_arr = data.split(' ');
    let search = new fullTextSearch({
        ignore_case: true,   // default = true, Ignore case during all search queries
        index_amount: 12,     // default = 12, The more indexes you have, the faster can be your search but the slower the 'add' method  gets
        minimum_chars: 3      // default = 1, The less minimum chars you want to use for your search, the slower the 'add' method gets
    });

    exports.get_csv_data_cb(bot, message, file, config, function(csv_data) {
        let to_say = config.module.csv.msg.search.ko;
        let res = '';
        if (csv_data !== ''){
            for (let i in csv_data) search.add(csv_data[i]);
            res = search_data(search, data_arr);
            if (res) {
                if (res.lentgh === 0)
                    to_say = config.module.csv.msg.search.ko;
                else {
                    to_say = config.module.csv.msg.search.ok + ': ' + res.length;
                    if (res.lentgh > config.module.csv.search_limit) {
                        to_say += ' but '+config.module.csv.search_limit+' displayed';
                    }
                    to_say += '\n- ' + res.join('\n- ');
                }
            }
        }
    });
};

search_data = function(search, pattern) {
    let i_search = 0; // traditionnal i(_loop) but for search result ^^
    let i_pos = 0; // traditionnal i(_loop) but for pos(ition) ^^
    let search_res = [];
    let pos_one = pos_two = pos_three = [0,[]];
    for (i_search in pattern) {
        search_res[i_search] = search.search(pattern[i_search]);
        //if (
    }
    for (i_search in search_res) {
        if (search_res[i_search].length > pos_one[0]) {
            pos_three[0] = pos_two[0];
            pos_three[1] = pos_two[1];
            pos_two[0] = pos_one[0];
            pos_two[1] = pos_one[1]
            pos_one[0] = search_res[i_search].length;
            pos_one[1] = i_search;
        }
        else if (search_res[i_search].length > pos_two[0]) {
            pos_three[0] = pos_two[0];
            pos_three[1] = pos_two[1];
            pos_two[0] = search_res[i_search].length;
            pos_two[1] = i_search;
        }
        else if (search_res[i_search].length > pos_three[0]) {
            pos_three[0] = search_res[i_search].length;
            pos_three[1] = i_search;
        }
    }
    return [pos_one[1],pos_two[1],pos_three[1]];
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

