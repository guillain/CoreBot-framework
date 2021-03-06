// Load tools library
var Log = require(__basedir + 'lib/log');
var Csv = require(__basedir + 'lib/csv');
var Redis = require(__basedir + 'lib/redis');

// Requirements
var fs = require('fs');
var fullTextSearch = require('full-text-search');

// CSV functions 
exports.get = function(controller, bot, message, config, mod_conf){
    // Get CSV file data
    Csv.get_csv_data(__basedir + mod_conf.file, function(csv_data) {
        if (!csv_data) {
            Log.error('controller csv search get no-csv-file ');
            return;
        }
        if (csv_data === '') bot.reply(message,mod_conf.msg.get.ko);
        else bot.reply(message, mod_conf.msg.get.ok = '\n- ' + csv_data.join("\n- "));
    });
};

exports.search = function(controller, bot, message, config, mod_conf){
    var msg_arr = message.text.split(' ');
    if ("csv" === msg_arr[0]) msg_arr.shift();
    if ("search" === msg_arr[0]) msg_arr.shift();
    var search = new fullTextSearch({
        ignore_case: true,   // default = true, Ignore case during all search queries
        index_amount: 12,     // default = 12, The more indexes you have, the faster can be your search but the slower the 'add' method  gets
        minimum_chars: 3      // default = 1, The less minimum chars you want to use for your search, the slower the 'add' method gets
    });

    // Get CSV file data
    fs.readFile(__basedir + mod_conf.file, function(err, data) {
        if (!data) {
            Log.error('controller autoreply search no-csv-file ');
            return;
        }

        var to_say = mod_conf.msg.search.ko;
        var res = '';
        var csv_data = data.toString().split('\n');

        for (var i in csv_data) search.add(csv_data[i]);
        res = search_data(search, msg_arr);
        if (res) {
            if (res.length > 0) {
                to_say = mod_conf.msg.search.ok + ': ' + res.length;
                if (res.length > mod_conf.search_limit)
                    to_say += ' but ' + mod_conf.search_limit + ' displayed';
                to_say += '\n- ' + res.join('\n- ');
            }
            else to_say = mod_conf.msg.search.ko;
        }
        bot.reply(message, to_say);
    });
};

search_data = function(search, pattern) {
    var search_res = [];
    var pos_one = pos_two = pos_three = [0,[]];
    for (i_search=0; i_search<pattern.length; i_search++)
        search_res[i_search] = search.search(pattern[i_search]);

    for (var i_search=0; i_search<search_res.length; i_search++) {
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

exports.load = function(controller, bot, message, config, mod_conf){
    // Parse CSV file and set value in redis
    fs.readFile(__basedir + mod_conf.file, function(err, data) {
        if (!data) {
            Log.error('controller csv load no-csv-file ');
            return;
        }
        var strs = [];
        var array = data.toString().split("\n");
        for(i = 0; i < array.length - 1; i++) {
            lineArr = array[i].split(';');
            strs.push(lineArr[0], lineArr[1]);
        }
        Redis.del(mod_conf.storage);
        Redis.hmset(mod_conf.storage, strs);

        if (i>0) res = mod_conf.msg.load.ok;
        else     res = mod_conf.msg.load.ko;
        bot.reply(message, res + '\n\nNumber of row imported: ' + i);
    });
};

exports.test = function(controller, bot, message, config, mod_conf) {
    // Parse CSV file and compare value with redis
    Csv.get_csv_data(__basedir + mod_conf.file, function(csv_data) {
        if (!csv_data) {
            Log.error('controller csv test no-csv-file ');
            return;
        }
        var csv_data_length = 0;
        if (csv_data !== '') csv_data_length = csv_data.length;

        Redis.hgetall(mod_conf.storage, function (kms) {
            if(!kms) Log.error('controller csv test db ' + err);

            var db_data_length = 0;
            for (km in kms) db_data_length++;

            if (csv_data_length === db_data_length)
                 res = mod_conf.msg.test.ok;
            else res = mod_conf.msg.test.ko;
            bot.reply(message, res + '\n\nFile: ' + csv_data_length + ' - Db: ' + db_data_length);
        });
    });
};
