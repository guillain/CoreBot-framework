// Load tools library
let Log = require(__basedir + 'lib/log');
let Csv = require(__basedir + 'lib/csv');
let Redis = require(__basedir + 'lib/redis');

// Requirements
let fs = require('fs');
let fullTextSearch = require('full-text-search');

// CSV functions 
exports.get = function(controller, bot, message, config){
    // Get CSV file data
    Csv.get_csv_data(__basedir + config.controller.hears.csv.file, function(csv_data) {
        if (!csv_data) {
            Log.error('controller hears csv search get no-csv-file ');
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
    let search = new fullTextSearch({
        ignore_case: true,   // default = true, Ignore case during all search queries
        index_amount: 12,     // default = 12, The more indexes you have, the faster can be your search but the slower the 'add' method  gets
        minimum_chars: 3      // default = 1, The less minimum chars you want to use for your search, the slower the 'add' method gets
    });

    // Get CSV file data
    fs.readFile(__basedir + config.controller.hears.csv.file, function(err, data) {
        if (!data) {
            Log.error('controller hears autoreply search no-csv-file ');
            return;
        }

        let to_say = config.controller.hears.csv.msg.search.ko;
        let res = '';
        let csv_data = data.toString().split('\n');

        for (let i in csv_data) search.add(csv_data[i]);
        res = search_data(search, msg_arr);
        if (res) {
            if (res.length > 0) {
                to_say = config.controller.hears.csv.msg.search.ok + ': ' + res.length;
                if (res.length > config.controller.hears.csv.search_limit)
                    to_say += ' but ' + config.controller.hears.csv.search_limit + ' displayed';
                to_say += '\n- ' + res.join('\n- ');
            }
            else to_say = config.controller.hears.csv.msg.search.ko;
        }
        bot.reply(message, to_say);
    });
};

search_data = function(search, pattern) {
    let search_res = [];
    let pos_one = pos_two = pos_three = [0,[]];
    for (i_search=0; i_search<pattern.length; i_search++)
        search_res[i_search] = search.search(pattern[i_search]);

    for (let i_search=0; i_search<search_res.length; i_search++) {
        if (search_res[i_search].length > pos_one[0]) {
            pos_three[0] = pos_two[0];
            pos_three[1] = pos_two[1];
            pos_two[0] = pos_one[0];
            pos_two[1] = pos_one[1];
            pos_one[0] = search_res[i_search].length;
            pos_one[1] = search_res[i_search];
        }
        else if (search_res[i_search].length > pos_two[0]) {
            pos_three[0] = pos_two[0];
            pos_three[1] = pos_two[1];
            pos_two[0] = search_res[i_search].length;
            pos_two[1] = search_res[i_search];
        }
        else if (search_res[i_search].length > pos_three[0]) {
            pos_three[0] = search_res[i_search].length;
            pos_three[1] = search_res[i_search];
        }
    }
    return [pos_one[1],pos_two[1],pos_three[1]];
};

exports.load = function(controller, bot, message, config){
    // Parse CSV file and set value in redis
    fs.readFile(__basedir + config.controller.hears.csv.file, function(err, data) {
        if (!data) {
            Log.error('controller hears csv load no-csv-file ');
            return;
        }
        var strs = [];
        var array = data.toString().split("\n");
        for(i = 0; i < array.length - 1; i++) {
            lineArr = array[i].split(';');
            strs.push(lineArr[0], lineArr[1]);
        }
        Redis.del(config.controller.hears.csv.storage);
        Redis.hmset(config.controller.hears.csv.storage, strs);

        if (i>0) res = config.controller.hears.csv.msg.load.ok;
        else     res = config.controller.hears.csv.msg.load.ko;
        bot.reply(message, res + '\n\nNumber of row imported: ' + i);
    });
};

exports.test = function(controller, bot, message, config) {
    // Parse CSV file and compare value with redis
    Csv.get_csv_data(__basedir + config.controller.hears.csv.file, function(csv_data) {
        if (!csv_data) {
            Log.error('controller hears csv test no-csv-file ');
            return;
        }
        let csv_data_length = 0;
        if (csv_data !== '') csv_data_length = csv_data.length;

        Redis.hgetall(config.controller.hears.csv.storage, function (kms) {
            if(!kms) Log.error('controller hears csv test db ' + err);

            let db_data_length = 0;
            for (km in kms) db_data_length++;

            if (csv_data_length === db_data_length)
                 res = config.controller.hears.csv.msg.test.ok;
            else res = config.controller.hears.csv.msg.test.ko;
            bot.reply(message, res + '\n\nFile: ' + csv_data_length + ' - Db: ' + db_data_length);
        });
    });
};

