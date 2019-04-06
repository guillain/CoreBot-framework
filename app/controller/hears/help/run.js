// Load required library
var Log = require(__basedir + 'lib/log');
var _ = require("underscore");

// Simple help request: list of activate controller instead if all is requested
exports.help = function(controller, bot, message, config, mod_conf) {
    var to_say = '';
    var msg_arr = message.text.split(' ');
    _.each(config['controller'], function (conf, control) {
        to_say += control + '\n\n';
        _.each(config['controller'][control], function (conf, index) {
            if (/all/i.test(msg_arr)) 
                to_say += '    - '+index+' - state: _'+config['controller'][control][index].enable+'_ - '+config['controller'][control][index].msg.help[0];
            else if (config['controller'][control][index].enable === true) 
                to_say += '    - '+index+' - '+config['controller'][control][index].msg.help[0];
            //to_say += '\n';
        });
        to_say += '\n';
    });
    // Bot Reply
    if (to_say) bot.reply(message, to_say);
    else        bot.reply(message, mod_conf.msg.module_not_found);
};

// If listener list is requested: display the listener of the controllers activate or all if requested
exports.help_listener = function(controller, bot, message, config, mod_conf) {
    var to_say = '';
    var msg_arr = message.text.split(' ');
    _.each(config['controller'], function (conf, control) {
        to_say += control + '\n\n';
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
        to_say += '\n';
    });
    // Bot Reply
    if (to_say) bot.reply(message, to_say);
    else        bot.reply(message, mod_conf.msg.module_not_found);
};

// If detail help is requested: display the help of the controllers activated or all if requested
exports.help_detail = function(controller, bot, message, config, mod_conf) {
    var to_say = '';
    var msg_arr = message.text.split(' ');
    _.each(config['controller'], function (conf, control) {
        to_say += '- ' + control + '\n';
        _.each(config['controller'][control], function (conf, index) {
            if ((/all/i.test(msg_arr)) || (config['controller'][control][index].enable === true)) {
                to_say += '    - ' + index;
                if (/all/i.test(msg_arr)) to_say += ' - state: _'+ config['controller'][control][index].enable + '_\n';
                else to_say += '\n';
                to_say += '\n        ' + config['controller'][control][index].msg.help.join('\n        ') + '\n';
            }
        });
        to_say += '\n';
    });
    // Bot Reply
    if (to_say) bot.reply(message, to_say);
    else        bot.reply(message, mod_conf.msg.module_not_found);
};

// Help of a module or controller.hears is requested (it includes detail)
exports.help_module = function(controller, bot, message, config, mod_conf) {
    var to_say = '';
    var msg_arr = message.text.split(' ');
    _.each(config['controller'], function (conf, control) {
        _.each(config['controller'][control], function (conf, index) {
            if (msg_arr.length>2 && msg_arr[2].indexOf(index) >= 0) {
                // Add standard help message
                to_say += config['controller'][control][index].msg.help.join('\n');

                // Add listener information if requested
                if ((msg_arr.toString().indexOf('detail') > -1) && (config['controller'][control][index].listener)) {
                    to_say += '\nListener \n';
                    _.each(config['controller'][control][index].listener, function (conf, listener) {
                        to_say += '- ' + listener + '\n';

                        _.each(config['controller'][control][index].listener[listener], function (conf, listener_param) {
                            to_say += '    - '+listener_param+': ' + config['controller'][control][index].listener[listener][listener_param] + '\n';
                        });
                    });
                }
            }
        });
    });
    // Bot Reply
    if (to_say) bot.reply(message, to_say);
    else        bot.reply(message, mod_conf.msg.module_not_found);

};

// Help when error in the command
exports.help_error = function(controller, bot, message, config, mod_conf) {
    var to_say = '';
    var msg_arr = message.text.split(' ');
    bot.reply(message, mod_conf.msg.error);
};

