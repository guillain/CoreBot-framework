// Load tools library
let tools = require(__basedir + 'lib/tools');

// Requirements
let run = require('node-google-translate-skidz');
let redis = require("redis");
let client = redis.createClient();
let lang_list = ["af","sq","am","ar","hy","az","eu","be","bn","bs","bg","ca","ceb","zh-CN","zh-TW","co","hr","cs","da","nl","en","eo","et","fi","fr","fy","gl","ka","de","el","gu","ht","ha","haw","he","hi","hmn","hu","is","ig","id","ga","it","ja","jw","kn","kk","km","ko","ku","ky","lo","la","lv","lt","lb","mk","mg","ms","ml","mt","mi","mr","mn","my","ne","no","ny","ps","fa","pl","pt","pa","ro","ru","sm","gd","sr","st","sn","sd","si","sk","sl","so","es","su","sw","sv","tl","tg","ta","te","th","tr","uk","ur","uz","vi","cy","xh","yi","yo","zu"];

// on connect
client.on('connect', function() {
    tools.debug('debug', 'module translate client on');
});

// on error
client.on("error", function (err) {
    tools.debug('debug', 'module translate client error ' + err);
});

// Translate 
exports.run = function(bot, message, config) {
  tools.debug('debug', 'module translate run');

  let data = [
    false,
    config.module.translate.default.lang_in,
    config.module.translate.default.lang_out
  ];

  user = message.personEmail;
  if(user.indexOf("chat") > -1) user = message.from_jid;
  let usertmp = user.split('@');
  let user = usertmp[0];

  grp_msg = "";
  if (message.group === true) grp_msg = " for user " + user;

  client.get(user, function(err, reply) {
    if (reply) data = reply.split(',');

    // order action according to the message content
    msg_arr = message.text.split(' ');
    if      (/^help$/i.test(msg_arr['0']))   { 
    	bot.reply(message, config.module.translate.msg.help);
    }
    else if (/^on$/i.test(msg_arr['0']))     { 
    	data[0] = 1; 
                    client.set(user, data.join(','));
    	bot.reply(message, config.module.translate.msg.on + grp_msg);
    }
    else if (/^off$/i.test(msg_arr['0']))    { 
    	data[0] = 0; 
                    client.set(user, data.join(','));
    	bot.reply(message, config.module.translate.msg.off + grp_msg);
    }
    else if (/^stat/i.test(msg_arr['0']))  { 
    	if (data[0] === 1) bot.reply(message, config.module.translate.msg.on + grp_msg);
    	else bot.reply(message, config.module.translate.msg.off + grp_msg);
    }
    else if (/^config/i.test(msg_arr['0'])) {
    	if      (msg_arr.length === 1)    {
    		bot.reply(message, config.module.translate.msg.conf + grp_msg + '\n- In _' + data[1] + '_\n- Out _' + data[2] + '_');
    	}
    	else if (msg_arr.length === 3)    { //todo: check if langin/1 & langout/2 exist in the lang dict of the translator
    		data[1] = msg_arr['1'];
    		data[2] = msg_arr['2'];
    		msg_arr.splice(0,3);
    		client.set(user, data.join(','));
    		bot.reply(message, config.module.translate.msg.conf_ok + grp_msg);
    	}
    	else {  bot.reply(message, config.module.translate.msg.help); }
    }
            else if (/^translate/i.test(msg_arr['0']) || ((lang_list.indexOf(msg_arr['0']) > -1) && (lang_list.indexOf(msg_arr['1']) > -1))) {
                    if (/^translate/i.test(msg_arr['0'])) {
                        test.shift()
                    }
                    if (msg_arr.length > 2)    { //todo: check if langin/1 & langout/2 exist in the lang dict of the translator
                            lang_in = msg_arr['0'];
                            lang_out = msg_arr['1'];
                            msg_arr.splice(0,2);

                            run({
                                    text: msg_arr.join(' '),
                                    source: lang_in,
                                    target: lang_out
                            }, function(result) {
                                    tools.debug('debug', 'module translate run manual ' + lang_in+') '+msg_arr.join(' ')+' to ('+lang_out+') '+ result);
                                    bot.reply(message, '_('+lang_in+' to '+lang_out+grp_msg+')_ ' + result);
                            });
                    }
                    else {  bot.reply(message, config.module.translate.msg.help); }
            }
    else if (data[0] === 1) { // Translate if state = 1
    	run({
    		text: message.text,
    		source: data[1],
    		target: data[2]
    	}, function(result) {
    		tools.debug('debug', 'module translate run auto '+data[1]+') '+message.text+' to ('+data[2]+') '+ result);
    		bot.reply(message, '_('+data[1]+' to '+data[2]+grp_msg+')_ ' + result);
    	});

    }
  });
};
