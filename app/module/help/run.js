// Load tools library
let tools = require(__basedir + 'lib/tools');

// Load required lib
let _ = require("underscore");

// AutoReply loader
exports.run = function(bot, message, config){
    tools.debug('debug', 'module help run');

    let found = '';
    let to_say = '';
    let msg_arr = message.text.split(' ');

    // Set if detail is requested
    let detail = false;
    if (/detail/i.test(message.text)) detail = true;

    // Reject if not Help command
    if (!/^help/i.test(message.text)) {
        tools.debug("info", 'module help run stop_no_command');
    }

    // Reject bot message
    else if (message.user === config.user) {
        tools.debug("info", 'module help run stop_bot_reply');
    }

    // Help of a module is requested
    else if ((msg_arr.length > 1) && (!/detail/i.test(message.text))) {
        let res = _.each(config.module, function (conf, index) {
            if (index === msg_arr[1]) found = index;
        });
        if (found !== '')
            to_say = config.module[found].msg.help.join('\n');
        else
            to_say = to_say = config.module.help.msg.nomodule;

        bot.reply(message, to_say);
    }
    // If all all help are requested
    else if ((msg_arr.length == 1) || (!/detail/i.test(message.text))) {
        _.each(config.module, function (conf, index) {
            if (config.module[index].enable === true) {
                if (msg_arr.length == 1)
                    to_say += '- '+index+' - '+config.module[index].help + '\n';
                else
                    to_say += '#'+index+'\n'+config.module[index].help + '\n';
            }
            bot.reply(message, to_say);
        });
    }
};

