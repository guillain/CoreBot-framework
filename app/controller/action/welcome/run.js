// Load tools library
var Log = require(__basedir + 'lib/log');
var User = require(__basedir + 'lib/user');
var Redis = require(__basedir + 'lib/redis');

// Requirements
var fs = require('fs');

// Exports controller function as scenario
exports.welcome = function(controller, bot, message, config, mod_conf) {
  to_day = new Date(Date.now())
  to_day_str = new Date(Date.now()).toUTCString()
 
  // Open user storage
  Redis.get(mod_conf.storage, function(reply) {
    console.log('>>>>>>>>>>>>>> to_day: ' + to_day);

    // Check if recorded date is in the past
    if (reply){
      var date_saved = new Date(reply);
      if (to_day.getTime() < date_saved.getTime()) {
        bot.reply(message, mod_conf.msg.welcome[Math.floor(Math.random()*mod_conf.msg.welcome.length)]);
      } else {
        bot.reply(message, mod_conf.msg.welcome_back[Math.floor(Math.random()*mod_conf.msg.welcome_back.length)]);
      }
    } else {
      bot.reply(message, mod_conf.msg.first_welcome[Math.floor(Math.random()*mod_conf.msg.first_welcome.length)] + User.get_user(message));
    }
  });

  // set current date for the user
  Redis.set(mod_conf.storage, to_day);
};	

