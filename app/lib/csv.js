/**
 * @file Google Translator features
 * @author guillain guillain.sanchez@dimensiondata.com
 * @license Dimension Data
 */

// Config
var config = require('../config');

// Requirements
var fs = require('fs');

// Help
exports.help = function() {
  return config.csv.msg.help;
};

// CSV functions loader
exports.get_data = function(bot, message, file, cb){
  get_csv_data(file, function(csv_data) {
    cb(csv_data);
  });
}
 
exports.load_in_db = function(bot, message){
  // Parse CSV file and set value in redis
  fs.readFile(config.csv.file, function(err, data) {
    if(err) throw err;
    var strs = [];
    var array = data.toString().split("\n");
    for(i = 0; i < array.length - 1; i++) {
      lineArr = array[i].split(';');
      strs.push(lineArr[0], lineArr[1]);
      //console.log('>>> i:'+i+', key:'+lineArr[0]+', txt:'+lineArr[1]);
    }
    client.del(config.csv.storage, redis.print);
    client.hmset(config.csv.storage, strs, redis.print);
    bot.reply(message, 'Nb of row imported:'+i);
  });
}

exports.test_db_csv = function(bot, trigger) {
  client.get('13121', function (err, km) {
    if (km) { bot.reply(message, '* km 13121 found:'+km); }
    else { bot.reply(message, '* km 13121 not found'); }
  });

  client.hget(config.SD.storage, '13121', function (err, kms) {
    if (kms) { bot.reply(message, '* km '+config.csv.storage+' found:'+kms); }
    else { bot.reply(message, '* km '+config.csv.storage+' not found'); }
  });
};

get_csv_data = function(file, cb) {
  console.log('>>> file: ' + file);

  fs.readFile(file, function(err, data) {
    if(err) throw err;
    var strs = [];
    var array = data.toString().split("\n");
    for(i = 0; i < array.length - 1; i++) {
      lineArr = array[i].split(';');
      strs.push(lineArr);
    }
    cb(strs)
  });
};

