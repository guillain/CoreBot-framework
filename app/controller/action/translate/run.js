// Load tools library
var Log = require(__basedir + 'lib/log');
var User = require(__basedir + 'lib/user');
var Redis = require(__basedir + 'lib/redis');

// Requirements
var fs = require('fs');
var run = require('node-google-translate-skidz');
var lang_list = ["af","sq","am","ar","hy","az","eu","be","bn","bs","bg","ca","ceb","zh-CN","zh-TW","co","hr","cs","da","nl","en","eo","et","fi","fr","fy","gl","ka","de","el","gu","ht","ha","haw","he","hi","hmn","hu","is","ig","id","ga","it","ja","jw","kn","kk","km","ko","ku","ky","lo","la","lv","lt","lb","mk","mg","ms","ml","mt","mi","mr","mn","my","ne","no","ny","ps","fa","pl","pt","pa","ro","ru","sm","gd","sr","st","sn","sd","si","sk","sl","so","es","su","sw","sv","tl","tg","ta","te","th","tr","uk","ur","uz","vi","cy","xh","yi","yo","zu"];

// Translate
exports.translate = function(controller, bot, message, config, mod_conf) {
  // Default user conf
  let data = [
      'manual',
      mod_conf.default.lang_in,
      mod_conf.default.lang_out
  ];

  // Get user ref
  let user = User.get_user(message);

  let grp_msg = "";
  if (message.group === true) grp_msg = " for user " + user;

  // Open user storage
  Redis.get(user, function(reply) {
    if (reply) data = reply.split(',');

    // Remove first pattern if: present + remove_pattern=true
    let msg_arr = message.text.split(' ');
    /*if ((data[0] !== 'automatic') && !(/^translate$/i.test(msg_arr['0']))){
        Log.debug('controller translate stop_no_command');
        return;
    }*/
    if (/^translate$/i.test(msg_arr['0'])) { 
        Log.debug('controller translate mod-name-del');
        msg_arr.shift();
    }

    // order action according to the message content
    if  (/^help$/i.test(msg_arr['0'])) 
        bot.reply(message, mod_conf.msg.help.join('\n'));
    else if (/^on$/i.test(msg_arr['0']))     { 
        data[0] = 'automatic'; 
        Redis.set(user, data.join(','));
        bot.reply(message, mod_conf.msg.on + grp_msg);
    }
    else if (/^off$/i.test(msg_arr['0']))    { 
        data[0] = 'manual';
        Redis.set(user, data.join(','));
        bot.reply(message, mod_conf.msg.off + grp_msg);
    }
    else if (/^stat/i.test(msg_arr['0']))  { 
        if (data[0] === 'automatic') bot.reply(message, mod_conf.msg.on + grp_msg);
        else bot.reply(message, mod_conf.msg.off + grp_msg);
    }
    else if (/^config/i.test(msg_arr['0'])) {
        if (msg_arr.length === 1){ 
            let msg = '\n- State _' + data[0] + '_\n- In _' + data[1] + '_\n- Out _' + data[2] + '_';
            bot.reply(message, mod_conf.msg.conf + grp_msg + msg);
        }
        else if (msg_arr.length === 3)    {
            if ((lang_list.indexOf(msg_arr['1']) > -1) && (lang_list.indexOf(msg_arr['2']) > -1)){
              data[1] = msg_arr['1'];
              data[2] = msg_arr['2'];
              Redis.set(user, data.join(','));
              bot.reply(message, mod_conf.msg.conf_ok + grp_msg);
            }
            else { bot.reply(message, mod_conf.msg.wrong_lang); }
        }
        else bot.reply(message, mod_conf.msg.help);
    }
    // Manual translate
    else if ((msg_arr.length > 2) && (data[0] === 'manual')){
        if ((lang_list.indexOf(msg_arr['0']) > -1) && (lang_list.indexOf(msg_arr['1']) > -1)){
            let lang_in = msg_arr['0'];
            let lang_out = msg_arr['1'];
            msg_arr.splice(0,2);
            //msg_arr[0] = data[0];
           run({
                text: msg_arr.join(' '),
                source: lang_in,
                target: lang_out
            }, function(result) {
                Log.debug('controller translate manual ' + lang_in+') '+msg_arr.join(' ')+' to ('+lang_out+') '+ result);
                bot.reply(message, '_('+lang_in+' to '+lang_out+grp_msg+')_ ' + result);
            });
        }
        else {  bot.reply(message, mod_conf.msg.wrong_lang); }
    }
    // Request to ranslate
    else if (data[0] === 'automatic') {
        run({
            text: message.text,
            source: data[1],
            target: data[2]
        }, function(result) {
            Log.debug('controller translate automatic '+data[1]+') '+message.text+' to ('+data[2]+') '+ result);
            bot.reply(message, '_('+data[1]+' to '+data[2]+grp_msg+')_ ' + result);
        });
    }
  });
};

