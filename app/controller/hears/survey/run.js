// Load CoreBot libraries
let tools = require(__basedir + 'lib/tools');
let csv = require(__basedir + 'module/csv/run.js');
let redis = require(__basedir + 'lib/redis.js');

// Requirements
let fs = require('fs');

// Survey controller hears
module.exports = function(controller, config) {
    tools.debug('debug', 'controller hears survey run');

    if (config.controller.hears.survey.enable === true) {
        let to_say = '';
        let user = tools.get_user(message);

        // Create new hears controller
        controller.hears(['^survey', '^survey report', '^survey report user'],
            ['message_received', 'direct_message', 'direct_mention', 'group_message'], function (bot, message) {
            // Report
            if(message.text.split(' ') > 1){
                // Open Redis survey storage
                redis.get(config.controller.hears.survey.storage, function (survey) {
                    tools.debug('debug', 'controller hears survey run survey ' + survey);
                    if ((!survey) || (!survey.report)) bot.reply(message, config.controller.hears.survey.msg.no_report);
                    else {
                        to_say = config.controller.hears.survey.msg.report + '\n';
                        for (let i_report=0; i_report<survey.report.length; i_report++)
                            to_say += '- ' + survey.report[i_report].value + ' - ' + survey.report[i_report].name + '\n';
                        bot.reply(message, to_say);
                    }

                    if(message.text.split(' ') > 2){
                        if ((!survey) || (!survey.users)) bot.reply(message, config.controller.hears.survey.msg.no_report);
                        else {
                            to_say = 'Users' + '\n';
                            for (let i_user = 0; i_user < survey.users.length; i_user++)
                                to_say += '- ' + survey.users[i_user].name + ' - ' + survey.users[i_user].step + '\n';
                            bot.reply(message, to_say);
                        }
                    }
                });
            }
            // Survey
            else {
                // Create new conversation
                bot.createConversation(message, function (err, convo) {
                    // Open Redis survey storage
                    redis.get(config.controller.hears.survey.storage, function (survey) {
                        tools.debug('debug', 'controller hears survey run survey ' + survey);
                        if (!survey) survey = {"users": {user: {"step":0}}, "report": {}};

                        // Get the CSV data
                        tools.debug('debug', 'controller hears survey run get_csv_data ' + __basedir + config.controller.hears.survey.file);
                        fs.readFile(__basedir + config.controller.hears.survey.file, function (err, csv_data) {
                            if (err) {
                                tools.debug('error', 'controller hears survey run no-csv-file ');
                                return;
                            }
                            let csv_array = csv_data.toString().split("\n");
                            let csv_line = csv_array[survey.users[user].step];
                            let question = csv_line[0] + '\n';
                            let pattern = '\w';
                            if (survey.users[user].step >= csv_array.length) {
                                bot.reply(message, config.controller.hears.survey.msg.already_done);
                                tools.debug('info', 'controller hears survey run user-already-done');
                                return;
                            }

                            tools.debug('debug', 'controller hears survey run csv_line ' + csv_line);

                            // Add each expected replies identified by digit in the question message and report if not exist
                            let survey_report = {};
                            if (csv_line.length > 1) {
                                pattern = '[0-9]';
                                let reply_arr = csv_line[1].split(',');
                                for (let i_reply_arr = 0; i_reply_arr < reply_arr.length; i_reply_arr++) {
                                    // Update question with the list of expected replies
                                    question += '- ' + (i_reply_arr + 1) + ' - ' + reply_arr[i_reply_arr] + '\n';

                                    // Create report entries in storage if not exist
                                    if (!survey.report)
                                        survey_report[i_reply_arr + 1] = {"name": reply_arr[i_reply_arr], "value": 0};
                                }
                            }
                            if (!survey.report) survey.report = survey_report;

                            tools.debug('debug', 'controller hears survey run question ' + question);

                            // Add Message for accepted replies
                            convo.addMessage({
                                text: config.controller.hears.survey.msg.reply_ok,
                            }, 'reply');

                            // Add Message for bad reply
                            convo.addMessage({
                                text: config.controller.hears.survey.msg.bad_reply,
                                action: 'default',
                            }, 'bad_reply');

                            // Add Question
                            convo.addQuestion(question, [
                                {
                                    pattern: pattern,
                                    callback: function (response, convo) {
                                        convo.gotoThread('reply');
                                    }
                                },
                                {
                                    default: true,
                                    callback: function (response, convo) {
                                        convo.gotoThread('bad_reply');
                                    }
                                }
                            ], {}, 'default');

                            // Add ending handler
                            convo.on('end', function (convo) {
                                if (convo.status === 'completed') {
                                    // do something useful with the users responses
                                    let res = convo.extractResponses();

                                    // reference a specific response by key
                                    let value = convo.extractResponse(pattern);

                                    // Increment values of user step and survey value
                                    survey.users[user].step++;
                                    survey.report[value].value++;

                                    // Save the Survey
                                    redis.set(config.controller.hears.survey.storage, survey);
                                    convo.say({text: config.controller.hears.survey.msg.end});
                                } else {
                                    // something happened that caused the conversation to stop prematurely
                                }
                            });

                            // Manage timeout
                            convo.onTimeout(function (convo) {
                                convo.say(config.controller.hears.survey.msg.timeout);
                                convo.next();
                            });

                            // now set the conversation in motion...
                            convo.activate();
                        });
                    });
                });
            }
        });
    }
    return controller;
};
