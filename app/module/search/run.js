// Load tools library
let tools = require(__basedir + 'lib/tools');

// Requirements
let request = require("request");

let redis = require("redis");
let client = redis.createClient({detect_buffers: true});

// let Search = require('redis-search');
// let search = Search.createSearch(config.module.search.storage);

let fs = require('fs');

// Search master fct
exports.run = function(bot, message, config){
    tools.debug('debug', 'module search run');

    // Remove first pattern if: present + prefixed=true
    let msg_arr = message.text.split(' ');

    // Variables for the search engine
    let i_total = i_arr = i_km = i_key = counter = 0;
    let res = re = keys_words = '';
    let msg_arr_key = res_i_km = [];
    let tosay = config.module.search.msg.notfound;

    if (!(/^search$/i.test(msg_arr['0'])) && (config.module.search.prefixed === true)){
        tools.debug('debug', 'module search run return');
        return;
    }
    if (/^search$/i.test(msg_arr['0'])) {
        tools.debug('debug', 'module search run mod-name-del');
        msg_arr.shift();
    }

    // order action according to the message content
    if (/^help$/i.test(msg_arr['0']))
        bot.reply(message, config.module.search.msg.help.join('\n'));
    else {
        client.hgetall(config.module.search.storage, function(err,kms){
            if (err) throw err;

            // Key array initilization
            for (i_arr in msg_arr) if (msg_arr[i_arr].length >= config.module.search.key_length) msg_arr_key[i_key++] = msg_arr[i_arr];
            let msg_arr_key_len = msg_arr_key.length;
            tools.debug('debug', 'module search run msg_arr ' + msg_arr);

            if (msg_arr_key_len !== 0) {

                // First search with all keys
                //let re =  new RegExp('\\b'+ msg_arr_key.join('(.)*') + '\\b','i');
                let re =  new RegExp(msg_arr_key.join('(.)*'),'i');
                for (i_km in kms) {
                    if(re.exec(kms[i_km])) {
                        if (i_total < config.module.search.limit) {
                            tools.debug('debug', 'module search run msg_arr_key.join ' + msg_arr_key.join(' '));
                            res += '- '+i_km+' - '+kms[i_km]+' `key words(1): '+msg_arr_key.join(' ')+'`\n'; 
                            res_i_km[i_total++] = i_km;
                        }
                        else i_total++;
                    }
                }

                tools.debug('debug', 'module search run i_total ' + i_total);
                tools.debug('debug', 'module search run res_i_km ' + res_i_km);
    
                // Complete the result with additionnal sub search
                if (i_total < config.module.search.limit){
                    for (i_km in kms) {
                        tools.debug('debug', 'module search run kms['+i_km+']' + kms[i_km]);

                        if (res_i_km.indexOf(i_km) < 0) {
                            keys_words = '';
                            counter = 0;
                            for (i_key=0; i_key < msg_arr_key_len; i_key++) {
                                tools.debug('debug', 'module search run msg_arr['+i_key+'] ' + msg_arr_key[i_key] + ' ' + i_km);

                                let re =  new RegExp(msg_arr_key[i_key],'i');
                                if (re.exec(kms[i_km])) {
                                    tools.debug('debug', 'module search run FOUND');
                                    counter++; 
                                    keys_words += ' '+msg_arr_key[i_key];
                                }
                            }
                            if (counter >= config.module.search.sub_limit){
                                tools.debug('debug', 'module search run i_total ' + i_total + ' ' + msg_arr_key);

                                if (i_total < config.module.search.limit) {
                                    res += '- '+i_km+' - '+kms[i_km]+' `key words(2.'+counter+'): '+keys_words+'`\n';
                                    //res_i_km[i_total++] = i_km;
                                    i_total++;
                                }
                                else i_total++;
                                tools.debug('debug', 'module search run i_total ' + i_total + ' ' + msg_arr_key);
                            }
                        }
                    }
                }
                if (i_total > 0) tosay = config.module.search.msg.found + ': ' + i_total;
                if (i_total > config.module.search.limit) tosay += ' but '+config.module.search.limit+' displayed';
            }
            else to_say = config.module.search.msg.too_short;

            bot.reply(message, tosay + '\n' + res);
        });
        /*
        search.query(phrase, function(err, ids){
            if (err) throw err;
            console.log('Search results for "%s":', phrase);
            console.log(ids);
            if (ids.length != 0) {
                tosay = 'Found \n';
                for(var i in ids) { tosay += '- '+ids[i]+'\n'; }
                bot.say(tosay);
            } else { bot.say(config.module.storage.msg.notfound); }
        });
        */
    }    
};

