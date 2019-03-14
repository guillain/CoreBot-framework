// Load required lib
var Log = require(__basedir + 'lib/log');
var Redis = require(__basedir + 'lib/redis');
var _ = require("underscore");

// Get User function
exports.get_user = function(message){
    var user = message.user;

    if (message.personEmail) {
        user = message.personEmail;
        Log.debug('lib user get_user personEmail ' + user);
    }
    else if (message.from_jid) {
        user = message.from_jid;
        Log.debug('lib user get_user from_jid ' + user);
    }
    var usertmp = user.split('@');
    user = usertmp[0];

    Log.debug('lib user get_user ' + user);
    return user;
};


// Get User function
exports.get_user_id = function(message){
    var user_id = message.userId;

    if (message.personId) {
        user_id = message.personId;
        Log.debug('lib user get_user personEmail ' + user_id);
    }
    else if (message.jid) {
        user_id = message.jid;
        Log.debug('lib user get_user from_jid ' + user_id);
    }

    Log.debug('lib user get_user_id ' + user_id);
    return user_id;
};

// Get the user privilege
exports.privilege_user = function(config, message, my_user = ''){
    var priv = false;
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
    var bot_found = false;
    if (my_user === '') my_user = User.get_user(message);
    
    // Loop over each launcher to get bot name
    _.each(config.launcher, function (conf, index) {
        // console.log('>>>>>>>', 'is_bot', 'my_user', my_user, 'conf.name', conf.name);
        
        if (conf.name && conf.name.indexOf(my_user) > -1)
            bot_found = true;
    });
    
    Log.debug('lib user bot_exception ' + my_user + ' ' + bot_found);
    return bot_found;
};

// Check user presence on Webex (Cisco Spark)
exports.user_presence_webex = function(controller){

    Redis.get('user_presence', function (user_presence_db) {
        let users = JSON.parse(user_presence_db);

        if(users.hasOwnProperty('user_presence')){
            users['user_presence'].forEach(function(user){
                let uri = 'people?email=' + user['user'];

                controller.api.people.request({
                    service: 'hydra',
                    resource: uri
                }).then(function(data) {
                    user.status = data.body.items[0].status;
                    user.id = data.body.items[0].id;
                    Redis.set_json('user_presence_webex', users);
                });
            });
        }
        Log.debug('lib users user_presence_webex ' + JSON.stringify(users));
    });
};

// Add user or list of users to track
exports.user_presence_add = function(users){
    Log.debug('lib users user_presence_add ' + JSON.stringify(users));
    Redis.get('user_presence', function (user_presence_db) {
        let users_obj = JSON.parse(user_presence_db);
        if(!users_obj || !users_obj.hasOwnProperty('user_presence')){
            users_obj = {user_presence: []}
        }

        users_obj['user_presence'].filter(function(data){
            return users.indexOf(data.user) === -1;
        });

        if(Array.isArray(users)){
            users.forEach(function(user){
                users_obj['user_presence'].push({user: user, status: 'unknown'});
            });
        }else{
            users_obj['user_presence'].push({user: users, status: 'unknown'});
        }
        Log.debug('lib users user_presence_add ' + JSON.stringify(users_obj));
        Redis.set_json('user_presence', users_obj);
    });
};

// Remove users from tracking
exports.user_presence_delete = function(users){
    Log.debug('lib users user_presence_delete ' + JSON.stringify(users));
    if(users){
        Redis.get('user_presence', function (user_presence_db) {
            let users_obj = JSON.parse(user_presence_db);
            if(users_obj && users_obj.hasOwnProperty('user_presence')){
                users_obj['user_presence'] = users_obj['user_presence'].filter(function(data){
                    return users.indexOf(data.user) === -1;
                });
                Redis.set_json('user_presence', users_obj);
                Log.debug('lib users user_presence_delete ' + JSON.stringify(users_obj));
            }
        });
    }else{
        Redis.set_json('user_presence', '');
        Log.debug('lib users user_presence_delete purge');
    }
};

// Check if user is available
exports.is_available = function(my_user = ''){

    let available = false;
    Redis.get('user_presence', function (user_presence_db) {
        let users = JSON.parse(user_presence_db);
        if(users.hasOwnProperty('user_presence')){
            let user = users['user_presence'].filter(function(data){
                return data.user === my_user})[0];
            if(user.status === 'active') available = true;
        }
    });
    return available;
};