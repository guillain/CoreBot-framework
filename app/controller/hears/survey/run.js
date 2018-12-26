// Load CoreBot libraries
let tools = require(__basedir + 'lib/tools');
let csv = require(__basedir + 'module/csv/run.js');
//let redis = require(__basedir + 'lib/redis.js');

// Requirements
let fs = require('fs');
var redis = require("redis");
let client = redis.createClient({detect_buffers: true});

// on connect
client.on('connect', function() {
    tools.debug('debug', 'redis client on');
});

// on error
client.on("error", function (err) {
    tools.debug('debug', 'redis client error ' + err);
});

// Survey controller hears
module.exports = function(controller, config) {
    tools.debug('debug', 'controller hears survey run');

    if (config.controller.hears.survey.enable === true) {
        // Check if initilization is need
        client.get(config.controller.hears.survey.storage, function (err, survey_db) {
            if (err) survey = survey_init(config);
        });

        // Survey report hears controller - to handle report
        controller.hears(['^survey reset'],
            ['message_received', 'direct_message', 'direct_mention', 'group_message'], function (bot, message) {
            let survey = survey_init(config);
            bot.reply(message, config.controller.hears.survey.msg.reset_done);
        });

        // Survey report hears controller - to handle report
        controller.hears(['^survey report$'],
            ['message_received', 'direct_message', 'direct_mention', 'group_message'], function (bot, message) {

            let to_say = '';
            let survey_user = tools.get_user(message);

            // Open Redis survey storage
            client.get(config.controller.hears.survey.storage, function (err, survey_db) {
                let survey = JSON.parse(survey_db);
                tools.debug('debug', 'controller hears survey run survey ' + JSON.stringify(survey));

                if (!survey.reports) bot.reply(message, config.controller.hears.survey.msg.no_report);
                else {
                    to_say = config.controller.hears.survey.msg.report + '\n';
                    // Loop over each question
                    for (i_report in survey.reports){
                        to_say += '- ' + survey.reports[i_report].name + '\n';
                        if (survey.reports[i_report].text){
                            if (survey.reports[i_report].text.length > 0) 
                                to_say += '\n    - ' + survey.reports[i_report].text.join('\n    - ');                            
                        }
                        else if (survey.reports[i_report].replies) {
                            for (i_reply in survey.reports[i_report].replies) {
                                to_say += '    - _' + survey.reports[i_report].replies[i_reply].value;
                                to_say += '_ - ' + survey.reports[i_report].replies[i_reply].name + '\n';
                            }
                        }
                    }
                    bot.reply(message, to_say);
                }
            });
        });

        // Survey report hears controller - to handle report
        controller.hears(['^survey report user'],
            ['message_received', 'direct_message', 'direct_mention', 'group_message'], function (bot, message) {

            let to_say = '';
            let survey_user = tools.get_user(message);

            // Open Redis survey storage
            client.get(config.controller.hears.survey.storage, function (err, survey_db) {
                let survey = JSON.parse(survey_db);
                tools.debug('debug', 'controller hears survey run survey ' + JSON.stringify(survey));

                if (!survey.users) bot.reply(message, config.controller.hears.survey.msg.no_report);
                else {
                    to_say = 'Users' + '\n';
                    for (let i_user in survey.users)
                        to_say += '- _' + survey.users[i_user].step + '_ - ' + i_user + '\n';
                    bot.reply(message, to_say);
                }
            });
        });

        // Survey new hears controller - to handle each question
        controller.hears(['^survey'],
            ['message_received', 'direct_message', 'direct_mention', 'group_message'], function (bot, message) {

            let survey = {};
            let to_say = '';
            let survey_user = tools.get_user(message);

            // Open Redis survey storage
            client.get(config.controller.hears.survey.storage, function (err, survey_db) {
                let survey = JSON.parse(survey_db);
                tools.debug('debug', 'controller hears survey run survey ' + JSON.stringify(survey));

                    // Create new conversation
                    bot.createConversation(message, function (err, convo) {
                        if ((survey.users === "") || (!survey.users[survey_user])) survey.users[survey_user] = {"step": 0};

                        let user_step = survey.users[survey_user].step;
                        if (user_step >= (survey.nb_report-1)) {
                            bot.reply(message, config.controller.hears.survey.msg.already_done);
                            tools.debug('info', 'controller hears survey run user-already-done');
                            return;
                        }

                        let pattern = '[0-9a-zA-Z]*';
                        let question = survey.reports[user_step].name;
                        let replies = '';
                        tools.debug('info', 'controller hears survey run question ' + question);

                        if (survey.reports[user_step].replies) {
                            for (i_reply in survey.reports[user_step].replies) {
                                replies += '- ' + (parseInt(i_reply,10)+1) + ' - ' + survey.reports[user_step].replies[i_reply].name + '\n';
                            }
                        }
                        tools.debug('info', 'controller hears survey run replies ' + replies);

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
                            convo.addQuestion(question + '\n' + replies, [
                                {
                                    pattern: pattern,
                                    callback: function (response, convo) {
                                        // Increment values of user step and survey value
                                        survey.users[survey_user].step++;
                                        if (survey.reports[user_step].replies)
                                            survey.reports[user_step].replies[parseInt(response.text,10)-1].value++;
                                        else if (survey.reports[user_step].text)
                                            survey.reports[user_step].text.push(response.text);

                                        tools.debug('info', 'controller hears survey run records ' + JSON.stringify(survey));
                                        client.set(config.controller.hears.survey.storage, JSON.stringify(survey), () => {});
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
                                if ((convo.status === 'completed') && (survey.users[survey_user].step >= survey.reports.length)){
                                    convo.say({text: config.controller.hears.survey.msg.end});
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
    return controller;
};

survey_init = function(config){
                    tools.debug('info', 'controller hears survey run init ');

                    // Initialization survey structur
                    let survey = { "users": {}, "reports": {}};

                    // Get the CSV data
                    tools.debug('debug', 'controller hears survey run init get_csv_data ' + __basedir + config.controller.hears.survey.file);
                    let csv_data = fs.readFileSync(__basedir + config.controller.hears.survey.file);
                    if (!csv_data) {
                        tools.debug('error', 'controller hears survey run init no-csv-file ');
                        return;
                    }

                    // Loop over each CSV line
                    let csv_array = csv_data.toString().split("\n");
                    survey['nb_report'] = csv_array.length;

                    for (let i_csv_arr=0; i_csv_arr<csv_array.length; i_csv_arr++) {
                            tools.debug('debug', 'controller hears survey run init csv_array['+i_csv_arr+'] ' + csv_array[i_csv_arr]);

                            // Get Question as first column in the CSV file
                            let question = csv_array[i_csv_arr].split(';')[0];
                            survey['reports'][i_csv_arr] = {"name":question};
                            tools.debug('debug', 'controller hears survey run question ' + question);

                            // If second column, it's for the expected replies
                            if (csv_array[i_csv_arr].split(';').length > 1) {
                                survey.reports[i_csv_arr].replies = {};

                                let reply_arr = csv_array[i_csv_arr].split(';')[1].split(',');
                                tools.debug('debug', 'controller hears survey run init reply_arr ' + reply_arr);

                                for (let i_reply_arr = 0; i_reply_arr < reply_arr.length; i_reply_arr++){
                                    tools.debug('debug', 'controller hears survey run init reply_arr['+i_reply_arr+'] ' + reply_arr[i_reply_arr]);
                                    survey.reports[i_csv_arr].replies[i_reply_arr] = {"name": reply_arr[i_reply_arr], "value": 0};
                                }
                            }
                            else survey.reports[i_csv_arr].text = [];
                            tools.debug('debug', 'controller hears survey run init survey ' + JSON.stringify(survey));
                    }

                    // Save the Survey in the db
                    client.set(config.controller.hears.survey.storage, JSON.stringify(survey), () => {});

                    return survey;
};

