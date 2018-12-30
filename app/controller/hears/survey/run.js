// Load CoreBot libraries
let Log = require(__basedir + 'lib/log');
let User = require(__basedir + 'lib/user');
let Redis = require(__basedir + 'lib/redis');

// Requirements
let fs = require('fs');

// Survey report hears controller - to handle report
exports.reset = function (controller, bot, message, config) {
    let survey = survey_init(config);
    bot.reply(message, config.controller.hears.survey.msg.reset_done);
};

// Survey report hears controller - to handle report
exports.report = function (bcontroller, bot, message, config) {
    let to_say = '';
    let survey_user = User.get_user(message);

    // Open Redis survey storage
    Redis.get(config.controller.hears.survey.storage, function (survey_db) {
        let survey = JSON.parse(survey_db);
        Log.debug('controller hears survey survey ' + JSON.stringify(survey));

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
};

// Survey report hears controller - to handle report
exports.report_user = function (controller, bot, message, config) {
    let to_say = '';
    let survey_user = User.get_user(message);

    // Open Redis survey storage
    Redis.get(config.controller.hears.survey.storage, function (survey_db) {
        let survey = JSON.parse(survey_db);
        Log.debug('controller hears survey survey ' + JSON.stringify(survey));

        if (!survey.user) bot.reply(message, config.controller.hears.survey.msg.no_report);
        else {
            to_say = 'Users' + '\n';
            for (let i_user in survey.user)
                to_say += '- _' + survey.user[i_user].step + '_ - ' + i_user + '\n';
            bot.reply(message, to_say);
        }
    });
};

// Survey new hears controller - to handle each question
exports.survey = function (controller, bot, message, config) {
    let survey = {};
    let to_say = '';
    let survey_user = User.get_user(message);

    // Open Redis survey storage
    Redis.get(config.controller.hears.survey.storage, function (survey_db) {
        let survey = JSON.parse(survey_db);
        Log.debug('controller hears survey survey ' + JSON.stringify(survey));

        // Create new conversation
        bot.createConversation(message, function (err, convo) {
            if ((survey.user === "") || (!survey.user[survey_user])) survey.user[survey_user] = {"step": 0};
            let user_step = survey.user[survey_user].step;

            // User already done with all steps
            if (user_step >= survey.nb_report) {
                bot.reply(message, config.controller.hears.survey.msg.already_done);
                Log.info('controller hears survey user-already-done');
                return;
            }

            // Loop over each question
            for (let i_report=0; i_report<survey.nb_report; i_report++){
                Log.info('controller hears survey i_report ' + i_report + ' - user_step ' + user_step);

                // User has not done all steps
                if (user_step <= i_report) {
                    let pattern = '[0-9a-zA-Z]*';
                    let question = survey.reports[i_report].name;
                    Log.info('controller hears survey question ' + question);

                    let replies = '';
                    if (survey.reports[i_report].replies) {
                        let pattern_counter = 0;
                        for (i_reply in survey.reports[i_report].replies) {
                            pattern_counter++;
                            replies += '- ' + (parseInt(i_reply,10)+1) + ' - ';
                            replies += survey.reports[i_report].replies[i_reply].name + '\n';
                        }
                        if (pattern_counter > 9) pattern = '[1-9][0-9]';
                        else pattern = '[1-' + pattern_counter + ']';
                    }
                    Log.info('controller hears survey replies ' + replies);

                    // Prepare tag to manage the ask vs replies
                    let question_tag = 'default';
                    if (i_report > 0) question_tag = 'question_' + i_report;

                    // Add Message for bad reply
                    convo.addMessage({
                        text: config.controller.hears.survey.msg.bad_reply,
                        action: question_tag,
                    }, 'bad_reply_' + i_report);

                    // Add Question
                    convo.addQuestion(question + '\n' + replies, [
                        {
                            pattern: pattern,
                            callback: function (response, convo) {
                                // Increment values of user step and survey value
                                if (survey.reports[i_report].replies)
                                    survey.reports[i_report].replies[parseInt(response.text,10)-1].value++;
                                else if (survey.reports[i_report].text)
                                    survey.reports[i_report].text.push(response.text);
                                survey.user[survey_user].step++;
 
                                Log.info('controller hears survey records ' + JSON.stringify(survey));
                                Redis.set_json(config.controller.hears.survey.storage, survey);

                                if (i_report < (survey.nb_report-1)) convo.gotoThread('question_' + (i_report+1));
                                else convo.gotoThread('end');
                            }
                        },
                        {
                            default: true,
                            callback: function (response, convo) {
                                convo.gotoThread('bad_reply_' + i_report);
                            }
                        }
                    ], {}, question_tag);
                }
            }
                   
            // Add Message for accepted replies
            convo.addMessage({
                text: config.controller.hears.survey.msg.end,
            }, 'end');
 
            // Manage timeout
            convo.onTimeout(function (convo) {
                convo.say(config.controller.hears.survey.msg.timeout);
                convo.next();
            });

            // Activate the Convo
            convo.activate();
        });
    });
};

survey_init = function(config){
    Log.info('controller hears survey init ');

    // Initialization survey structur
    let survey = { "user": {}, "reports": {}};

    // Get the CSV data
    Log.debug('controller hears survey init get_csv_data ' + __basedir + config.controller.hears.survey.file);
    let csv_data = fs.readFileSync(__basedir + config.controller.hears.survey.file);
    if (!csv_data) {
        Log.error('controller hears survey init no-csv-file ');
        return;
    }

    // Loop over each CSV line
    let csv_array = csv_data.toString().split("\n");
    survey['nb_report'] = csv_array.length-1;

    for (let i_csv_arr=0; i_csv_arr<csv_array.length-1; i_csv_arr++) {
            Log.debug('controller hears survey init csv_array['+i_csv_arr+'] ' + csv_array[i_csv_arr]);

            // Get Question as first column in the CSV file
            let question = csv_array[i_csv_arr].split(';')[0];
            survey['reports'][i_csv_arr] = {"name":question};
            Log.debug('controller hears survey question ' + question);

            // If second column, it's for the expected replies
            if (csv_array[i_csv_arr].split(';').length > 1) {
                survey.reports[i_csv_arr].replies = {};

                let reply_arr = csv_array[i_csv_arr].split(';')[1].split(',');
                Log.debug('controller hears survey init reply_arr ' + reply_arr);

                for (let i_reply_arr = 0; i_reply_arr < reply_arr.length; i_reply_arr++){
                    Log.debug('controller hears survey init reply_arr['+i_reply_arr+'] ' + reply_arr[i_reply_arr]);
                    survey.reports[i_csv_arr].replies[i_reply_arr] = {"name": reply_arr[i_reply_arr], "value": 0};
                }
            }
            else survey.reports[i_csv_arr].text = [];
            Log.debug('controller hears survey init survey ' + JSON.stringify(survey));
    }

    // Save the Survey in the db
    Redis.set_json(config.controller.hears.survey.storage, survey);

    return survey;
};

