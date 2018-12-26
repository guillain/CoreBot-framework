// Load tools library
let tools = require(__basedir + 'lib/tools');

// Load required lib
let _ = require("underscore");

// Exports controller function as scenario
module.exports = function(controller, config) {
    if (config.controller.hears.help.enable === false) return;

    controller.hears(['help', 'help *'], ['message_received', 'direct_message', 'direct_mention', 'group_message'], function (bot, message) {
        tools.debug('debug', 'module help run ' + message.text);

        let found = 0;
        let to_say = '';
        let msg_arr = message.text.split(' ');
        tools.debug('debug', 'module help run ' + msg_arr);
 
        let all = msg_arr.indexOf('all');
        let detail = msg_arr.indexOf('detail');

        // Reject bot message
        if (message.user === config.user) {
            tools.debug("debug", 'module help run stop_bot_reply');
        }
        if (msg_arr.length === 1) {
            to_say = 'Module\n';
            _.each(config.module, function (conf, index) {
                if (config.module[index].enable === true)
                    to_say += '    - '+index+' - '+config.module[index].msg.help[0];
            });

            to_say += 'Controller\n';
            _.each(config.controller.hears, function (conf, index) {
                if (config.controller.hears[index].enable === true)
                    to_say += '    - '+index+' - '+config.controller.hears[index].msg.help[0];
            });

            bot.reply(message, to_say);
        }
        // If all help are requested
        else if ((msg_arr.length > 1) && ((all >= 0) || (detail >=0))){
            to_say += 'Module\n';
            _.each(config.module, function (conf, index) {
                if (detail < 0) {
                    to_say += '    - '  + index;
                    if (all >= 0) to_say += ' - state:_' + config.module[index].enable + '_';
                    to_say += ' - ' + config.module[index].msg.help[0];
                }
                else if (detail >= 0) {
                    if (!((all < 0) && (config.module[index].enable === false))) {
                        to_say += '# '+index+'\n';
                        if (all >= 0) to_say += 'State: _'+ config.module[index].enable + '_\n';
                        to_say += config.module[index].msg.help.join('\n') + '\n';
                    }
                }
            });
            to_say += 'Controller\n';
            _.each(config.controller.hears, function (conf, index) {
                if (detail < 0) {
                    to_say += '    - '  + index;
                    if (all >= 0) to_say += ' - state:_' + config.controller.hears[index].enable + '_';
                    to_say += ' - ' + config.controller.hears[index].msg.help[0];
                }
                else if (detail >= 0) {
                    if (!((all < 0) && (config.controller.hears[index].enable === false))) {
                        to_say += '# '+index+'\n';
                        if (all >= 0) to_say += 'State: _'+ config.controller.hears[index].enable + '_\n';
                        to_say += config.controller.hears[index].msg.help.join('\n') + '\n';
                    }
                }
            });
            if (to_say) bot.reply(message, config.controller.hears.help.msg.modulefound + '\n' + to_say);
            else        bot.reply(message, config.controller.hears.help.msg.modulenotfound);
        }

        // Help of a module or controller.hears is requested (it includes detail)
        else if ((msg_arr.length > 1) && ((all < 0) || (detail < 0))) {
            // Search in Module
            _.each(config.module, function (conf, index) {
                if (msg_arr[1].indexOf(index) >= 0) {
                    bot.reply(message, config.module[index].msg.help.join('\n'));
                    found++;
                }
            });

            // Search in Controller
            _.each(config.controller.hears, function (conf, index) {
                if (msg_arr[1].indexOf(index) >= 0) {
                    bot.reply(message, config.controller.hears[index].msg.help.join('\n'));
                    found++;
                }
            });

            if (found === 0)
                bot.reply(message, config.controller.hears.help.msg.modulenotfound);
        }
    });
};

