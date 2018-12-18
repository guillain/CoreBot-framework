// Load tools library
let tools = require(__basedir + 'lib/tools');

// Requirements
let csv = require(__basedir + 'module/csv/run.js');

// AutoReply loader
exports.run = function(bot, message, config){
    tools.debug('debug', 'module autoreply run');

    if (message.user === config.launcher.spark.mail) {
        tools.debug("info", 'module autoreply run stop_bot_reply');

        return;
    }

    // Get CSV file data
    csv.get_data(bot, message, __basedir + config.module.autoreply.file, config, function(csv_data) {
        tools.debug("info", 'module autoreply run csv_data  len ' + csv_data.length);

        // Pickup one entry
        let index = Math.floor(Math.random() * csv_data.length);
        let csv_picked_up = csv_data[index];
        tools.debug('info', ' module autoreply run csv_picked_up index ' + index + ' csv_picked_up ' + csv_picked_up[0]);

        // Delay
        tools.debug('info', 'module autoreply run delay ' + config.module.autoreply.delay*1000);
        setTimeout(function () {
            // Send reply
            let msg_to_send = csv_picked_up[0] + '\n' + csv_picked_up[2];
            //let msg_to_send = csv_picked_up[0] + '\n' + csv_picked_up[1] + '\n' + csv_picked_up[2];
            //let msg_to_send = '<a href="' + csv_picked_up[2] + '">' + csv_picked_up[0] + '</a>';
            tools.debug('debug', 'module autoreply run send_reply ' + msg_to_send);
            bot.reply(message, msg_to_send);
        }, config.module.autoreply.delay * 1000);
    });
};
