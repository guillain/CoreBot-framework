// Load required lib
let _ = require("underscore");

// Exports controller function as scenario
exports.run = function(controller, config) {
    if (config.controller.hears.help.enable === true) {
        controller.hears(['help', 'help *'] ['message_received', 'direct_message', 'direct_mention', 'group_message'], function (bot, message) {

            let to_say = '';
            let msg_arr = message.text.split(' ');

            // Help of a module is requested
            if ((msg_arr.length > 1) && (!/^d/i.test(msg_arr['1']))) {
                let res = _.find(config.module, msg_arr['1'], function (conf, index) {
                    to_say = config.module[index].help.join('\n');
                });
                if (!res) bot.reply(message, config.module.help.msg.nomodule);
            }
            // If all all help are requested
            else {
                _.each(config.module, function (conf, index) {
                    if (config.module[index].enable === true) {
                        if (msg_arr.length == 1)
                            to_say += '- '+index+' - '+config.module[index].help[0];
                        else
                            to_say += '#'+index+'\n'+config.module[index].help.join('\n');
                    }
                    bot.reply(message, to_say);
                });
            }
        });
    }
};

