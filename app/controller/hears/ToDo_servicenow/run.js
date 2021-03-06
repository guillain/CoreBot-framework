// Load CoreBot libraries
var Log = require(__basedir + 'lib/log');
var User = require(__basedir + 'lib/user');
var Redis = require(__basedir + 'lib/redis');

// Requirements
var fs = require('fs');

// Survey report hears controller - to handle report
exports.reset = function (controller, bot, message, config, mod_conf) {
    let survey = survey_init(config, mod_conf);
    bot.reply(message, mod_conf.msg.reset_done);
};

// Survey report hears controller - to handle report
exports.report = function (bcontroller, bot, message, config, mod_conf) {
    var to_say = '';
    var survey_user = User.get_user(message);

    // Open Redis survey storage
    Redis.get(mod_conf.storage, function (survey_db) {
        var survey = JSON.parse(survey_db);
        Log.debug('controller survey survey ' + JSON.stringify(survey));

        if (!survey.reports) bot.reply(message, mod_conf.msg.no_report);
        else {
            to_say = mod_conf.msg.report + '\n';
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
exports.report_user = function (controller, bot, message, config, mod_conf) {
    var to_say = '';
    var survey_user = User.get_user(message);

    // Open Redis survey storage
    Redis.get(mod_conf.storage, function (survey_db) {
        var survey = JSON.parse(survey_db);
        Log.debug('controller survey report_uer ' + JSON.stringify(survey));

        if (!survey.user) bot.reply(message, mod_conf.msg.no_report);
        else {
            to_say = 'Users' + '\n';
            for (var i_user in survey.user)
                to_say += '- _' + survey.user[i_user].step + '_ - ' + i_user + '\n';
            bot.reply(message, to_say);
        }
    });
};

// Survey new hears controller - to handle each question
exports.survey = function (controller, bot, message, config, mod_conf) {
    var survey = {};
    var to_say = '';
    var survey_user = User.get_user(message);

    // Open Redis survey storage
    Redis.get(mod_conf.storage, function (survey_db) {
        var survey = JSON.parse(survey_db);
        Log.debug('controller survey survey ' + JSON.stringify(survey));

        // Create new conversation
        bot.createConversation(message, function (err, convo) {
            if ((survey.user === "") || (!survey.user[survey_user])) survey.user[survey_user] = {"step": 0};
            var user_step = survey.user[survey_user].step;

            // User already done with all steps
            if (user_step >= survey.nb_report) {
                bot.reply(message, mod_conf.msg.already_done);
                Log.info('controller survey user-already-done');
                return;
            }

            // Loop over each question
            for (var i_report=0; i_report<survey.nb_report; i_report++){
                Log.info('controller survey i_report ' + i_report + ' - user_step ' + user_step);

                // User has not done all steps
                if (user_step <= i_report) {
                    var pattern = '[0-9a-zA-Z]*';
                    var question = survey.reports[i_report].name;
                    Log.info('controller survey question ' + question);

                    var replies = '';
                    if (survey.reports[i_report].replies) {
                        var pattern_counter = 0;
                        for (i_reply in survey.reports[i_report].replies) {
                            pattern_counter++;
                            replies += '- ' + (parseInt(i_reply,10)+1) + ' - ';
                            replies += survey.reports[i_report].replies[i_reply].name + '\n';
                        }
                        if (pattern_counter > 9) pattern = '[1-9][0-9]';
                        else pattern = '[1-' + pattern_counter + ']';
                    }
                    Log.info('controller survey replies ' + replies);

                    // Prepare tag to manage the ask vs replies
                    var question_tag = 'default';
                    if (i_report > 0) question_tag = 'question_' + i_report;

                    // Add Message for bad reply
                    convo.addMessage({
                        text: mod_conf.msg.bad_reply,
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
 
                                Log.info('controller survey records ' + JSON.stringify(survey));
                                Redis.set_json(mod_conf.storage, survey);

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
                text: mod_conf.msg.end,
            }, 'end');
 
            // Manage timeout
            convo.onTimeout(function (convo) {
                convo.say(mod_conf.msg.timeout);
                convo.next();
            });

            // Activate the Convo
            convo.activate();
        });
    });
};

survey_init = function(config, mod_conf){
    Log.info('controller survey init ');

    // Initialization survey structur
    var survey = { "user": {}, "reports": {}};

    // Get the CSV data
    Log.debug('controller survey init get_csv_data ' + __basedir + mod_conf.file);
    var csv_data = fs.readFileSync(__basedir + mod_conf.file);
    if (!csv_data) {
        Log.error('controller survey init no-csv-file ');
        return;
    }

    // Loop over each CSV line
    var csv_array = csv_data.toString().split("\n");
    survey['nb_report'] = csv_array.length-1;

    for (var i_csv_arr=0; i_csv_arr<csv_array.length-1; i_csv_arr++) {
            Log.debug('controller survey init csv_array['+i_csv_arr+'] ' + csv_array[i_csv_arr]);

            // Get Question as first column in the CSV file
            var question = csv_array[i_csv_arr].split(';')[0];
            survey['reports'][i_csv_arr] = {"name":question};
            Log.debug('controller survey question ' + question);

            // If second column, it's for the expected replies
            if (csv_array[i_csv_arr].split(';').length > 1) {
                survey.reports[i_csv_arr].replies = {};

                var reply_arr = csv_array[i_csv_arr].split(';')[1].split(',');
                Log.debug('controller survey init reply_arr ' + reply_arr);

                for (var i_reply_arr = 0; i_reply_arr < reply_arr.length; i_reply_arr++){
                    Log.debug('controller survey init reply_arr['+i_reply_arr+'] ' + reply_arr[i_reply_arr]);
                    survey.reports[i_csv_arr].replies[i_reply_arr] = {"name": reply_arr[i_reply_arr], "value": 0};
                }
            }
            else survey.reports[i_csv_arr].text = [];
            Log.debug('controller survey init survey ' + JSON.stringify(survey));
    }

    // Save the Survey in the db
    Redis.set_json(mod_conf.storage, survey);

    return survey;
};

