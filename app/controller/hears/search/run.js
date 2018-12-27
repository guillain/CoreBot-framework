// Load tools library
let tools = require(__basedir + 'lib/tools');

// Requirements
let request = require("request");

let redis = require("redis");
let client = redis.createClient({detect_buffers: true});

// let Search = require('redis-search');
// let search = Search.createSearch(config.controller.hears.search.storage);

let fs = require('fs');

// Search master fct
exports.search = function(controller, bot, message, config){
    // Remove first pattern if: present + prefixed=true
    let msg_arr = message.text.split(' ');

    // Variables for the search engine
    let i_total = 0;
    let i_key = 0;
    let counter = 0;
    let res = '';
    let keys_words = '';
    let msg_arr_key = [];
    let res_i_km = [];
    let to_say = config.controller.hears.search.msg.notfound;

    msg_arr.shift();

    client.hgetall(config.controller.hears.search.storage, function(err,kms){
        if (err) throw err;

        // Key array initialization
        for (let i_arr in msg_arr)
            if (msg_arr[i_arr].length >= config.controller.hears.search.key_length)
                msg_arr_key[i_key++] = msg_arr[i_arr];
        let msg_arr_key_len = msg_arr_key.length;
        tools.debug('debug', 'controller hears search msg_arr ' + msg_arr);

        if (msg_arr_key_len !== 0) {

            // First search with all keys
            //let re =  new RegExp('\\b'+ msg_arr_key.join('(.)*') + '\\b','i');
            let re =  new RegExp(msg_arr_key.join('(.)*'),'i');
            for (let i_km in kms) {
                if(re.exec(kms[i_km])) {
                    if (i_total < config.controller.hears.search.limit) {
                        tools.debug('debug', 'controller hears search msg_arr_key.join ' + msg_arr_key.join(' '));
                        res += '- '+i_km+' - '+kms[i_km]+' `key words(1): '+msg_arr_key.join(' ')+'`\n';
                        res_i_km[i_total++] = i_km;
                    }
                    else i_total++;
                }
            }

            tools.debug('debug', 'controller hears search i_total ' + i_total);
            tools.debug('debug', 'controller hears search res_i_km ' + res_i_km);

            // Complete the result with additionnal sub search
            if (i_total < config.controller.hears.search.limit){
                for (let i_km in kms) {
                    tools.debug('debug', 'controller hears search kms['+i_km+']' + kms[i_km]);

                    if (res_i_km.indexOf(i_km) < 0) {
                        keys_words = '';
                        counter = 0;
                        for (let i_key=0; i_key < msg_arr_key_len; i_key++) {
                            tools.debug('debug', 'controller hears search msg_arr['+i_key+'] ' + msg_arr_key[i_key] + ' ' + i_km);

                            let re =  new RegExp(msg_arr_key[i_key],'i');
                            if (re.exec(kms[i_km])) {
                                tools.debug('debug', 'controller hears search FOUND');
                                counter++;
                                keys_words += ' '+msg_arr_key[i_key];
                            }
                        }
                        if (counter >= msg_arr_key_len){
                            tools.debug('debug', 'controller hears search i_total ' + i_total + ' ' + msg_arr_key);

                            if (i_total < config.controller.hears.search.limit) {
                                res += '- '+i_km+' - '+kms[i_km]+' `key words(2.'+counter+'): '+keys_words+'`\n';
                                //res_i_km[i_total++] = i_km;
                                i_total++;
                            }
                            else i_total++;
                            tools.debug('debug', 'controller hears search i_total ' + i_total + ' ' + msg_arr_key);
                        }
                    }
                }
            }
            if (i_total > 0) to_say = config.controller.hears.search.msg.found + ': ' + i_total;
            if (i_total > config.controller.hears.search.limit) to_say += ' but '+config.controller.hears.search.limit+' displayed';
        }
        else to_say = config.controller.hears.search.msg.too_short;

        bot.reply(message, to_say + '\n' + res);
    });
    /*
    search.query(phrase, function(err, ids){
        if (err) throw err;
        console.log('Search results for "%s":', phrase);
        console.log(ids);
        if (ids.length != 0) {
            to_say = 'Found \n';
            for(var i in ids) { to_say += '- '+ids[i]+'\n'; }
            bot.say(to_say);
        } else { bot.say(config.controller.hears.search.msg.notfound); }
    });
    */
};

