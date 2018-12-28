// Load tools library
let tools = require(__basedir + 'lib/tools');

// Load required lib
let _ = require("underscore");

// Simple help request: list of activate controller instead if all is requested
exports.help = function(controller, bot, message, config) {
    let to_say = '';
    let msg_arr = message.text.split(' ');
    _.each(config['controller'], function (conf, control) {
        to_say += control + '\n';
        _.each(config['controller'][control], function (conf, index) {
            if (/all/i.test(msg_arr)) 
                to_say += '    - '+index+' - state: _'+config['controller'][control][index].enable+'_ - '+config['controller'][control][index].msg.help[0];
            else if (config['controller'][control][index].enable === true) 
                to_say += '    - '+index+' - '+config['controller'][control][index].msg.help[0];
        });
    });
    // Bot Reply
    if (to_say) bot.reply(message, to_say);
    else        bot.reply(message, config.controller.hears.help.msg.modulenotfound);
};

// If listener list is requested: display the listener of the controllers activate or all if requested
exports.help_listener = function(controller, bot, message, config) {
    let to_say = '';
    let msg_arr = message.text.split(' ');
    _.each(config['controller'], function (conf, control) {
        to_say += control + '\n';
        _.each(config['controller'][control], function (conf, index) {
            if (config['controller'][control][index].listener) {
                to_say += '- ' + index + '\n';
                _.each(config['controller'][control][index].listener, function (conf, listener) {
                    if ((/all/i.test(msg_arr)) || (config['controller'][control][index].enable === true)) {
                        to_say += '    - ' + listener + '\n';
                        if (/all/i.test(msg_arr))
                            to_say += '        - enable: ' + config['controller'][control][index].enable + '\n';
                        if (config['controller'][control][index].listener[listener].pattern)
                            to_say += '        - pattern: ' + config['controller'][control][index].listener[listener].pattern + '\n';
                        if (config['controller'][control][index].listener[listener].from)
                            to_say += '        - from: ' + config['controller'][control][index].listener[listener].from + '\n';
                    }
                });
            }
        });
    });
    // Bot Reply
    if (to_say) bot.reply(message, to_say);
    else        bot.reply(message, config.controller.hears.help.msg.modulenotfound);
}

// If detail help is requested: display the help of the controllers activated or all if requested
exports.help_detail = function(controller, bot, message, config) {
    let to_say = '';
    let msg_arr = message.text.split(' ');
    _.each(config['controller'], function (conf, control) {
        to_say += control + '\n';
        _.each(config['controller'][control], function (conf, index) {
            if ((/all/i.test(msg_arr)) || (config['controller'][control][index].enable === true)) {
                to_say += '\n*' + index + '*\n';
                if (/all/i.test(msg_arr)) to_say += 'State: _'+ config['controller'][control][index].enable + '_\n';
                to_say += config['controller'][control][index].msg.help.join('\n') + '\n';
            }
        });
    });
    // Bot Reply
    if (to_say) bot.reply(message, to_say);
    else        bot.reply(message, config.controller.hears.help.msg.modulenotfound);
}

// Help of a module or controller.hears is requested (it includes detail)
exports.help_module = function(controller, bot, message, config) {
    let to_say = '';
    let msg_arr = message.text.split(' ');
    _.each(config['controller'], function (conf, control) {
        _.each(config['controller'][control], function (conf, index) {
            if (msg_arr[2].indexOf(index) >= 0) {
                // Add standard help message
                to_say += config['controller'][control][index].msg.help.join('\n');

                // Add listener information
                if (config['controller'][control][index].listener) {
                    to_say += '\nListener \n';
                    _.each(config['controller'][control][index].listener, function (conf, listener) {
                        to_say += '- ' + listener + '\n';
                        if (config['controller'][control][index].listener[listener].pattern)
                            to_say += '    - pattern: ' + config['controller'][control][index].listener[listener].pattern + '\n';
                        if (config['controller'][control][index].listener[listener].from)
                            to_say += '    - from: ' + config['controller'][control][index].listener[listener].from + '\n';
                    });
                }
            }
        });
    });
    // Bot Reply
    if (to_say) bot.reply(message, to_say);
    else        bot.reply(message, config.controller.hears.help.msg.modulenotfound);

};

