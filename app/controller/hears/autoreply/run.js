// Load required library
var Log = require(__basedir + 'lib/log');
var fs = require('fs');

// AutoReply loader
exports.autoreply = function(controller, bot, message, config, mod_conf){
    // Get CSV file data
    var csv_data = fs.readFileSync(__basedir + mod_conf.file);
    if (!csv_data) {
        Log.error('controller autoreply no-csv-file ');
        return;
    }
    Log.debug('controller autoreply csv_data  len ' + csv_data.length);

    // Pickup one entry
    var index = Math.floor(Math.random() * csv_data.length);
    var csv_picked_up = csv_data[index];
    Log.info('controller autoreply csv_picked_up index ' + index + ' csv_picked_up ' + csv_picked_up[0]);

    // Delay
    Log.info('controller autoreply delay ' + mod_conf.delay*1000);
    setTimeout(function () {
        // Send reply
        var msg_to_send = csv_picked_up[0] + '\n' + csv_picked_up[2];
        //var msg_to_send = csv_picked_up[0] + '\n' + csv_picked_up[1] + '\n' + csv_picked_up[2];
        //var msg_to_send = '<a href="' + csv_picked_up[2] + '">' + csv_picked_up[0] + '</a>';
        Log.debug('controller autoreply send_reply ' + msg_to_send);
        bot.reply(message, msg_to_send);
    }, mod_conf.delay * 1000);
};
