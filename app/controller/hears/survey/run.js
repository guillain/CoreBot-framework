// Load CoreBot libraries
let tools = require(__basedir + 'lib/tools');
let csv = require(__basedir + 'module/csv/run.js');

// Requirements
let fs = require('fs');

// Survey controller hears
module.exports = function(controller, config) {
    tools.debug('debug', 'controller hears survey run');

    if (config.controller.hears.survey.enable === true) {

        // Create new controller hears
        controller.hears('^survey', ['message_received', 'direct_message', 'direct_mention', 'group_message'], function (bot, message) {
            // Create new conversation
            bot.createConversation(message, function (err, convo) {
                // Get the CSV data
                tools.debug('debug', 'controller hears survey run get_csv_data');
                fs.readFile(config.controller.hears.survey.file, function(err, data) {
                    if(err) throw err;

                    let i_line_arr = i_reply_arr = 0;
                    let line_arr = reply_arr = [];
                    let array = data.toString().split("\n");

                    // Parse all CSV lines to generate one conversation by question
                    for(i_line_arr = 0; i_line_arr < array.length - 1; i_line_arr++) {
                        let line_arr = array[i_line_arr].split(';');
                        let question = line_arr[0] +'\n';
                        let pattern = '\w';

                        // Add each expected replies identified by digit in the question message
                        if (line_arr.length > 1) {
                            pattern = '[0-9]';
                            let reply_arr = line_arr[1].split(',');
                            for (i_reply_arr = 0; i_reply_arr < reply_arr.length; i_reply_arr++)
                                question += '- ' + (i_reply_arr+1) + ' - ' + reply_arr[i_reply_arr] + '\n';
                        }

                        // Add Message for accepted replies
                        convo.addMessage({
                            text: config.controller.hears.survey.msg.reply_ok,
                        }, 'reply_' + i_line_arr);

                        // Add Message for bad reply
                        convo.addMessage({
                            text: config.controller.hears.survey.msg.bad_reply,
                            action: 'default_' + i_line_arr,
                        }, 'bad_reply_' + i_line_arr);

                        // Add Question
                        convo.addQuestion(question, [
                            {
                                pattern: pattern,
                                callback: function (response, convo) {
                                    convo.gotoThread('reply_' + i_line_arr);
                                },
                            },
                            {
                                default: true,
                                callback: function (response, convo) {
                                    convo.gotoThread('bad_reply_' + i_line_arr);
                                },
                            }
                        ], {}, 'default_' + i_line_arr);

                        convo.onTimeout(function (convo) {
                            convo.say(config.controller.hears.survey.msg.timeout);
                            convo.next();
                        });

                        // now set the conversation in motion...
                        convo.activate();
                    }
                });
            });
        });
    }
    return controller;
};
