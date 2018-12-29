// Load required lib
let Log = require(__basedir + 'lib/log');
let _ = require("underscore");

// Get User function
exports.get_user = function(message){
    let user = message.user;

    if (message.personEmail) user = message.personEmail;
    if ((!user) || (user === "") || (user === "null")){
        if (message.from_jid) user = message.from_jid;
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
