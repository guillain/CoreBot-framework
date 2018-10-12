/**
 * @file Google Translator features
 * @author guillain guillain.sanchez@dimensiondata.com
 * @license Dimension Data
 */

// Config
var config = require('../config');

// Requirements
var csv = require('./csv.js');

// Help
exports.help = function() {
  return config.autoreply.msg.help;
};

// AutoReply loader
exports.switcher = function(bot, message){
  // Load CSV file in local DB
  csv.get_data(bot, message, config.autoreply.file, function(csv_data) {
    console.log('>>> csv_data - len: ' + csv_data.length);
    if (config.debug == 1) {
        console.log('>>> csv_data - len: ' + csv_data.length + ' - data: ' + csv_data);
    }

    // Pickup one entry
    index = Math.floor(Math.random() * csv_data.length);
    csv_picked_up = csv_data[index];
    console.log('>>> csv_picked_up - index: ' + index + ' - csv_picked_up[0]: - ' + csv_picked_up[0]);

    // Delay
    console.log('>>> set_timeout - delay: ' + config.autoreply.delay * 1000);
    setTimeout(function () {
      // Send reply
      msg_to_send = csv_picked_up[0] + '\n' + csv_picked_up[2];
      //msg_to_send = csv_picked_up[0] + '\n' + csv_picked_up[1] + '\n' + csv_picked_up[2];
      //msg_to_send = '<a href="' + csv_picked_up[2] + '">' + csv_picked_up[0] + '</a>';
      console.log('>>> send_reply - msg_to_send: ' + msg_to_send);
      bot.reply(message, msg_to_send);
    }, config.autoreply.delay * 1000);
  });
};


function random_int_inc(low, high) {
  return Math.floor(Math.random() * (high - low + 1) + low)
}

