// Load framework libraries
var Log = require(__basedir + 'lib/log');
var Redis = require(__basedir + 'lib/redis');

// Search master fct
exports.search = function(controller, bot, message, config, mod_conf){
    // Remove first pattern if: present + remove_pattern=true
    var msg_arr = message.text.split(' ');

    // Variables for the search engine
    var i_total = 0;
    var i_key = 0;
    var counter = 0;
    var res = '';
    var keys_words = '';
    var msg_arr_key = [];
    var res_i_km = [];
    var to_say = mod_conf.msg.notfound;

    msg_arr.shift();

    Redis.hgetall(mod_conf.storage, function(kms){
        // Key array initialization
        for (var i_arr in msg_arr)
            if (msg_arr[i_arr].length >= mod_conf.key_length)
                msg_arr_key[i_key++] = msg_arr[i_arr];
        var msg_arr_key_len = msg_arr_key.length;
        Log.debug('controller search msg_arr ' + msg_arr);

        if (msg_arr_key_len !== 0) {

            // First search with all keys
            //var re =  new RegExp('\\b'+ msg_arr_key.join('(.)*') + '\\b','i');
            var re =  new RegExp(msg_arr_key.join('(.)*'),'i');
            for (var i_km in kms) {
                if(re.exec(kms[i_km])) {
                    if (i_total < mod_conf.limit) {
                        Log.debug('controller search msg_arr_key.join ' + msg_arr_key.join(' '));
                        res += '- '+i_km+' - '+kms[i_km]+' `key words(1): '+msg_arr_key.join(' ')+'`\n';
                        res_i_km[i_total++] = i_km;
                    }
                    else i_total++;
                }
            }

            Log.debug('controller search i_total ' + i_total);
            Log.debug('controller search res_i_km ' + res_i_km);

            // Complete the result with additionnal sub search
            if (i_total < mod_conf.limit){
                for (var i_km in kms) {
                    Log.debug('controller search kms['+i_km+']' + kms[i_km]);

                    if (res_i_km.indexOf(i_km) < 0) {
                        keys_words = '';
                        counter = 0;
                        for (var i_key=0; i_key < msg_arr_key_len; i_key++) {
                            Log.debug('controller search msg_arr['+i_key+'] ' + msg_arr_key[i_key] + ' ' + i_km);

                            var re =  new RegExp(msg_arr_key[i_key],'i');
                            if (re.exec(kms[i_km])) {
                                Log.debug('controller search FOUND');
                                counter++;
                                keys_words += ' '+msg_arr_key[i_key];
                            }
                        }
                        if (counter >= msg_arr_key_len){
                            Log.debug('controller search i_total ' + i_total + ' ' + msg_arr_key);

                            if (i_total < mod_conf.limit) {
                                res += '- '+i_km+' - '+kms[i_km]+' `key words(2.'+counter+'): '+keys_words+'`\n';
                                //res_i_km[i_total++] = i_km;
                                i_total++;
                            }
                            else i_total++;
                            Log.debug('controller search i_total ' + i_total + ' ' + msg_arr_key);
                        }
                    }
                }
            }
            if (i_total > 0) to_say = mod_conf.msg.found + ': ' + i_total;
            if (i_total > mod_conf.limit) to_say += ' but '+mod_conf.limit+' displayed';
        }
        else to_say = mod_conf.msg.too_short;

        bot.reply(message, to_say + '\n' + res);
    });
};

