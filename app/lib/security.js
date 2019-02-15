// Load required lib
var Log = require(__basedir + 'lib/log');
var User = require(__basedir + 'lib/user');
var _ = require("underscore");

// Get the user privilege, return user's privilege
exports.privilege = function(config, message, listener, my_user = ''){
    let is_ok = false;
    if (my_user === '') my_user = User.get_user(message);
    let user_priv = User.privilege_user(config, message, my_user);

    if (listener.privilege.toString().indexOf(user_priv) > -1) is_ok = true;

    Log.debug('lib security privilege_user ' + my_user + ' ' + is_ok);
    return is_ok;
};

// Check if ACL match, return boolean
exports.access_list = function(config, message, listener){
    let is_ok = false;

    // Loop over each access_list name of the controller
    let my_ACLs = listener.access_list;
    for (let i_acl=0; i_acl<my_ACLs.length; i_acl++) {

        // If it exists in the global config file
        if (config.access_list[my_ACLs[i_acl]]) {

            // Loop over each pattern of the ACL of the global conf
            let my_patterns = config.access_list[my_ACLs[i_acl]].pattern;
            for (let i_pat=0; i_pat<my_patterns.length; i_pat++) {

                if (((config.access_list[my_ACLs[i_acl]].permission === "allow")
                    && (message.user.indexOf(my_patterns[i_pat])))
                    ||
                    ((config.access_list[my_ACLs[i_acl]].permission === "block")
                        && (!message.user.indexOf(my_patterns[i_pat]))))
                    is_ok = true;
            }
        }
    }

    Log.debug('lib security access_list ' + my_ACLs + ' ' + is_ok);
    return is_ok;
};

// Study if message is allowed or not for this user and context, return boolean
exports.validation = function(config, message, listener){
    let is_validate = true;
    let my_user = User.get_user(message);

    // REJECT if it's a bot
    if (User.is_bot(config, message, my_user)) is_validate = false;

    // REJECT if ACL block
    if (!exports.access_list(config, message, listener)) is_validate = false;

    // REJECT if user doesn't have the good privilege
    if (!exports.privilege(config, message, listener, my_user)) is_validate = false;

    Log.debug('lib security validation ' + my_user + ' ' + is_validate);
    return is_validate;
};
