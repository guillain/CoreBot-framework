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
exports.privilege_user = function(config, my_user){
    let priv = false;
    if (config.user[my_user])
        priv = config.user[my_user].privilege;
    else
        priv = config.user.default.privilege;

    Log.debug('lib user privilege_user ' + my_user + ' ' + priv);
    return priv;
};

// Check if ACL match
exports.access_list = function(config, message, my_acl){
	let acl_match = false;
	if (config.access_list[my_acl]){
		if ((config.access_list[my_acl].permission === "allow")
			&& (message.text.match('/' + config.access_list[my_acl].pattern + '/')))
			acl_match = true;
	}
	Log.debug('lib user privilege_user ' + my_acl + ' ' + acl_match);
    return acl_match;
};

// Bot exception list
exports.bot_exception = function(config, message){
	let bot_found = false;
	let user = exports.get_user(message);
    // Loop over each launcher to get bot name
    _.each(config.launcher, function (conf, index) {
		if (conf.name.indexOf(user) > -1)
			bot_found = true;
	});
	Log.debug('lib user bot_exception ' + bot_found);
	return bot_found;
};
