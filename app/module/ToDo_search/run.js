/**
 * @file Defines ServiceDesk functions for Spark
 * @author guillain <guillain@gmail.com>
 * @license LGPL-3.0
**/

// Load config
const config = require('../../config');
config.search = require('./search');
var request = require("request");

var redis = require("redis");
var client = redis.createClient({detect_buffers: true});

var Search = require('redis-search');
var search = Search.createSearch(config.db.km);

var fs = require('fs');

// Help fct
exports.help = function() {
  return config.search.msg.help;
};

// Search master fct
exports.run = function(bot, message){
  let tosay = config.search.msg.found + '\n';
  console.log('>>> search: trigger.args.join(): ' + trigger.args.join(' '));

  client.hgetall(config.db.km, function(err,kms){
    let j = 0;
    if (err) throw err;
    for (let i in kms) {
      let re =  new RegExp('\\b'+ trigger.args.join(' ') + '\\b','i');
      if(re.exec(kms[i])) { 
        if (j < config.search.limit) { tosay += '- '+kms[i]+'\n'; }
        j++;
      }
    }
    if (j == 0) {
      tosay = config.msg.notfound;
    }
    else if (j > config.search.limit) {
      tosay += '\n'+j+' result found but '+config.search.limit+' displayed\n';
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
    } else { bot.say(config.msg.notfound); }
  });
  */
};

