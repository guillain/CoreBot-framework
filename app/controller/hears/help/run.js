// Exports controller function as scenario
exports.run = function(controller, config) {
    if (config.controller.hears.help.enable === true) {
        controller.hears(['help', 'help *'], ['direct_message', 'direct_mention', 'group_message'], function (bot, message) {
            let to_say = '';
            let msg_arr = message.text.split(' ');
            if (!/^d/i.test(msg_arr['1']))
                to_say = config.module[index].help.join('\n');

            _.each(config.module, function (conf, index) {
                if (config.module[index].enable === true) {
                    if ((/^d/i.test(msg_arr['1'])) || ((!/^d/i.test(msg_arr['1'])) && (msg_arr['1'] === index)))
                        to_say += config.module[index].help.join('\n');
                    else
                        to_say += config.module[index].help[0];
                }
            });
            bot.reply(message, to_say);
        });
    }
};
