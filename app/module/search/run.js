// Load tools library
let tools = require(__basedir + 'lib/tools');
let tools = require(__basedir + 'module/search/search.js');

// Requirements
let request = require("request");

let redis = require("redis");
let client = redis.createClient({detect_buffers: true});

let Search = require('redis-search');
let search = Search.createSearch(config.db.km);

let fs = require('fs');

// Search master fct
exports.run = function(bot, message){
  tools.debug('debug', 'module search run');

  let tosay = config.module.search.msg.found + '\n';

  client.hgetall(config.module.search.storage, function(err,kms){
    let j = 0;
    if (err) throw err;
    for (let i in kms) {
      let re =  new RegExp('\\b'+ trigger.args.join(' ') + '\\b','i');
      if(re.exec(kms[i])) { 
        if (j < config.module.search.limit) { tosay += '- '+kms[i]+'\n'; }
        j++;
      }
    }
    if (j == 0) {
      tosay = config.module.search.msg.notfound;
    }
    else if (j > config.search.limit) {
      tosay += '\n'+j+' result found but '+config.module.search.limit+' displayed\n';
    }
    bot.say(tosay);
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
};

