// Load tools library
let tools = require(__basedir + 'lib/tools');

// Load required lib
let _ = require("underscore");

// Exports controller function as scenario
exports.help = function(controller, bot, message, config) {
    let found = 0;
    let to_say = '';
    let msg_arr = message.text.split(' ');
    let all = msg_arr.indexOf('all');
    let detail = msg_arr.indexOf('detail');

    // Reject bot message
    if (message.user === config.user) {
        tools.debug("debug", 'controller hear help stop_bot_reply');
    }
    if (msg_arr.length === 1) {
        _.each(config['controller'], function (conf, control) {
            to_say += control + '\n';
            _.each(config['controller'][control], function (conf, index) {
                if (config['controller'][control][index].enable === true)
                    to_say += '    - '+index+' - '+config['controller'][control][index].msg.help[0];
            });
        });
    }
    // If all help are requested
    else if ((msg_arr.length > 1) && ((all >= 0) || (detail >=0))){
        _.each(config['controller'], function (conf, control) {
            to_say += control + '\n';
            _.each(config['controller'][control], function (conf, index) {
                if (detail < 0) {
                    to_say += '    - '  + index;
                    if (all >= 0) to_say += ' - state:_' + config['controller'][control][index].enable + '_';
                    to_say += ' - ' + config['controller'][control][index].msg.help[0];
                }
                else if (detail >= 0) {
                    if (!((all < 0) && (config['controller'][control][index].enable === false))) {
                        to_say += '\n*' + index + '*\n';
                        if (all >= 0) to_say += 'State: _'+ config['controller'][control][index].enable + '_\n';
                        to_say += config['controller'][control][index].msg.help.join('\n') + '\n';
                    }
                }
            });
        });
    }

    // Help of a module or controller.hears is requested (it includes detail)
    else if ((msg_arr.length > 1) && ((all < 0) || (detail < 0))) {
        _.each(config['controller'], function (conf, control) {
            _.each(config['controller'][control], function (conf, index) {
                if (msg_arr[1].indexOf(index) >= 0) 
                    to_say += config['controller'][control][index].msg.help.join('\n');
            });
        });
    }

    // Bot Reply
    if (to_say) bot.reply(message, to_say);
    else        bot.reply(message, config.controller.hears.help.msg.modulenotfound);
};

