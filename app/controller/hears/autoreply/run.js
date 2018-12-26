// Load tools library
let tools = require(__basedir + 'lib/tools');

// Requirements
let csv = require(__basedir + 'module/csv/run.js');

// AutoReply loader
exports.autoreply = function(controller, bot, message, config){
    // Reject bot message
    if (message.user === config.user) {
        tools.debug("info", 'controller hears autoreply stop_bot_reply ');
        return;
    }

    // Get CSV file data
    let csv_data = fs.readFileSync(__basedir + config.controller.hears.autoreply.file);
    if (!csv_data) {
        tools.debug('error', 'controller hears autoreply no-csv-file ');
        return;
    }

    tools.debug("info", 'controller hears autoreply csv_data  len ' + csv_data.length);

    // Pickup one entry
    let index = Math.floor(Math.random() * csv_data.length);
    let csv_picked_up = csv_data[index];
    tools.debug('info', 'controller hears autoreply csv_picked_up index ' + index + ' csv_picked_up ' + csv_picked_up[0]);

    // Delay
    tools.debug('info', 'controller hears autoreply delay ' + config.controller.hears.autoreply.delay*1000);
    setTimeout(function () {
        // Send reply
        let msg_to_send = csv_picked_up[0] + '\n' + csv_picked_up[2];
        //let msg_to_send = csv_picked_up[0] + '\n' + csv_picked_up[1] + '\n' + csv_picked_up[2];
        //let msg_to_send = '<a href="' + csv_picked_up[2] + '">' + csv_picked_up[0] + '</a>';
        tools.debug('debug', 'controller hears autoreply send_reply ' + msg_to_send);
        bot.reply(message, msg_to_send);
    }, config.controller.hears.autoreply.delay * 1000);
};
