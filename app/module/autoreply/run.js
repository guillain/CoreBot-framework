// Requirements
let csv = require('../csv/run.js');

// AutoReply loader
exports.switcher = function(bot, message, config){
    // Get CSV file data
    csv.get_data(bot, message, config.module.autoreply.file, function(csv_data) {
        console.log('>>> csv_data - len: ' + csv_data.length);
        if (config.log.debug === 1) {
            console.log('>>> csv_data - len: ' + csv_data.length + ' - data: ' + csv_data);
        }

        // Pickup one entry
        let index = Math.floor(Math.random() * csv_data.length);
        let csv_picked_up = csv_data[index];
        console.log('>>> csv_picked_up - index: ' + index + ' - csv_picked_up[0]: - ' + csv_picked_up[0]);

        // Delay
        console.log('>>> set_timeout - delay: ' + config.module.autoreply.delay*1000);
        setTimeout(function () {
            // Send reply
            let msg_to_send = csv_picked_up[0] + '\n' + csv_picked_up[2];
            //let msg_to_send = csv_picked_up[0] + '\n' + csv_picked_up[1] + '\n' + csv_picked_up[2];
            //let msg_to_send = '<a href="' + csv_picked_up[2] + '">' + csv_picked_up[0] + '</a>';
            console.log('>>> send_reply - msg_to_send: ' + msg_to_send);
            bot.reply(message, msg_to_send);
        }, config.module.autoreply.delay * 1000);
    });
};
