// Load tools library
let tools = require(__basedir + 'lib/tools');

// Requirements
let fs = require('fs');
var redis = require("redis");
let client = redis.createClient({detect_buffers: true});
let fullTextSearch = require('full-text-search');

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
exports.get = function(controller, bot, message, config){
    // Get CSV file data
    tools.get_csv_data(__basedir + config.controller.hears.csv.file, function(csv_data) {
        if (!csv_data) {
            tools.debug('error', 'controller hears csv search get no-csv-file ');
            return;
        }
        if (csv_data === '') bot.reply(message,config.controller.hears.csv.msg.get.ko);
        else bot.reply(message, config.controller.hears.csv.msg.get.ok = '\n- ' + csv_data.join("\n- "));
    });
};

exports.search = function(controller, bot, message, config){
    let msg_arr = message.text.split(' ');
    if ("csv" === msg_arr[0]) msg_arr.shift();
    if ("search" === msg_arr[0]) msg_arr.shift();
    let data_arr = data.split(' ');
    let search = new fullTextSearch({
        ignore_case: true,   // default = true, Ignore case during all search queries
        index_amount: 12,     // default = 12, The more indexes you have, the faster can be your search but the slower the 'add' method  gets
        minimum_chars: 3      // default = 1, The less minimum chars you want to use for your search, the slower the 'add' method gets
    });

    // Get CSV file data
    fs.readFile(__basedir + config.controller.hears.csv.file, function(err, data) {
        if (!data) {
            tools.debug('error', 'controller hears autoreply search no-csv-file ');
            return;
        }

        let to_say = config.controller.hears.csv.msg.search.ko;
        let res = '';
        let csv_data = data.toString().split('\n');

        for (let i in csv_data) search.add(csv_data[i]);
        res = search_data(search, data_arr);
        if (res) {
            if (res.length === 0)
                to_say = config.controller.hears.csv.msg.search.ko;
            else {
                to_say = config.controller.hears.csv.msg.search.ok + ': ' + res.length;
                if (res.length > config.controller.hears.csv.search_limit) {
                    to_say += ' but ' + config.controller.hears.csv.search_limit + ' displayed';
                }
                to_say += '\n- ' + res.join('\n- ');
            }
        }
        bot.reply(message, to_say);
    });
};

search_data = function(search, pattern) {
    let i_search = 0; // traditionnal i(_loop) but for search result ^^
    let i_pos = 0; // traditionnal i(_loop) but for pos(ition) ^^
    let search_res = [];
    let pos_one = pos_two = pos_three = [0,[]];
    for (i_search in pattern) {
        search_res[i_search] = search.search(pattern[i_search]);
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

exports.load = function(controller, bot, message, config){
    // Parse CSV file and set value in redis
    fs.readFile(__basedir + config.controller.hears.csv.file, function(err, data) {
        if (!data) {
            tools.debug('error', 'controller hears csv load no-csv-file ');
            return;
        }
        var strs = [];
        var array = data.toString().split("\n");
        for(i = 0; i < array.length - 1; i++) {
            lineArr = array[i].split(';');
            strs.push(lineArr[0], lineArr[1]);
        }
        client.del(config.controller.hears.csv.storage, redis.print);
        client.hmset(config.controller.hears.csv.storage, strs, redis.print, function (err, reply) {
            if(err) {
               tools.debug('error', 'controller hears csv load db ' + err);
               throw err;
            }
        });

        if (i>0) res = config.controller.hears.csv.msg.load.ok;
        else     res = config.controller.hears.csv.msg.load.ko;
        bot.reply(message, res + '\n\nNumber of row imported: ' + i);
    });
};

exports.test = function(controller, bot, message, config) {
    // Parse CSV file and compare value with redis
    tools.get_csv_data(__basedir + config.controller.hears.csv.file, function(csv_data) {
        if (!csv_data) {
            tools.debug('error', 'controller hears csv test no-csv-file ');
            return;
        }
        let csv_data_length = 0;
        if (csv_data !== '') csv_data_length = csv_data.length;

        client.hgetall(config.controller.hears.csv.storage, function (err, kms) {
            if(err) tools.debug('error', 'controller hears csv test db ' + err);

            let db_data_length = 0;
            for (km in kms) db_data_length++;

            if (csv_data_length === db_data_length)
                 res = config.controller.hears.csv.msg.test.ok;
            else res = config.controller.hears.csv.msg.test.ko;
            bot.reply(message, res + '\n\nFile: ' + csv_data_length + ' - Db: ' + db_data_length);
        });
    });
};

