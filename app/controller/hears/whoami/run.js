// Load CoreBot libraries
let Log = require(__basedir + 'lib/log');

// Exports controller function as scenario
exports.whoami= function(controller, bot, message, config, mod_conf) {
    let to_say = 'You are ' + message.user;
    if(message.team) to_say += ' in the team ' + message.team;
    if(message.channel) to_say += ' through the channel ' + message.channel;
    if(message.data){
        if (message.data.personEmail) to_say += ' and your email is ' + message.data.personEmail;
        if (message.data.personId) to_say += ' with the id ' + message.data.personId;
    }
    bot.reply(message, to_say);
};
