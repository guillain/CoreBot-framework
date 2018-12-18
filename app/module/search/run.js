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
        let tosay = config.module.search.msg.notfound;
        client.hgetall(config.module.search.storage, function(err,kms){
            let j = 0;
            let res = '';
            if (err) throw err;
            for (let i in kms) {
                let re =  new RegExp('\\b'+ msg_arr.join(' ') + '\\b','i');
                if(re.exec(kms[i])) { 
                    if (j < config.module.search.limit) { res += '- '+kms[i]+'\n'; }
                    j++;
                }
            }
            if (j > 0) tosay = config.module.search.msg.found + ': ' + j;
            if (j > config.module.search.limit) tosay += ' but '+config.module.search.limit+' displayed';
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

