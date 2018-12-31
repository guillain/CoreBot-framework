// Load required lib
let Log = require(__basedir + 'lib/log');
let _ = require("underscore");

// Get User function
exports.get_user = function(message){
    let user = message.user;

    if (message.personEmail) {
        user = message.personEmail;
        Log.debug('lib user get_user personEmail ' + user);
    }
    else if (message.from_jid) {
        user = message.from_jid;
        Log.debug('lib user get_user from_jid ' + user);
    }
    let usertmp = user.split('@');
    user = usertmp[0];

    Log.debug('lib user get_user ' + user);
    return user;
};

// Get the user privilege
exports.privilege_user = function(config, message, my_user = ''){
    let priv = false;
    if (my_user === '') my_user = exports.get_user(message);

    if (config.user[my_user])
        priv = config.user[my_user].privilege;
    else
        priv = config.user.default.privilege;

    Log.debug('lib user privilege_user ' + my_user + ' ' + priv);
    return priv;
};

// Bot exception list, return boolean
exports.is_bot = function(config, message, my_user = ''){
    let bot_found = false;
    if (my_user === '') my_user = User.get_user(message);
    
    // Loop over each launcher to get bot name
    _.each(config.launcher, function (conf, index) {
        //console.log('>>>>>>>', 'is_bot', 'my_user', my_user, 'conf.name', conf.name);
        
        if (conf.name.indexOf(my_user) > -1)
            bot_found = true;
    });
    
    Log.debug('lib security bot_exception ' + my_user + ' ' + bot_found);
    return bot_found;
};
