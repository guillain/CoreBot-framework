// Load required lib
var Log = require(__basedir + 'lib/log');
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

// Get all details from User function
exports.get_user_details = async function(controller, message, cb) {
  var user = message.user;

  // Channel with an API
  if (controller.api) {
    // Spark User
    if (controller.api.sessionId.slice(0,5) == "spark") {
      controller.api.people.get(message.userId).then(function(people) {
        cb({
          "userId": people.id,
          "displayName": people.displayName,
          "nickName": people.nickName,
          "firstName": people.firstName,
          "lastName": people.lastName,
          "emails": people.emails
        })
      })
      return
    }
  }
  // Local User
  if (message.personEmail) {
    cb({
      "displayName": message.personEmail
        .split('@')[0] // we don't need the domain of the email
        .split('.') // email often begins with firstname.lastname
        .map((word) => (word.replace(word[0], word[0].toUpperCase()))) // capitalize each word
        .join(' '), // join to make a string
      "emails": [message.personEmail]
    })
  } else if (message.from_jid) {
    cb({
      "displayName": message.from_jid.split('@')[0]
    })
  } else if (message.user) {
    cb({
      "userId": message.user.split('@')[0]
    })
  } else {
    cb({})
  }
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
    
    Log.debug('lib security bot_exception ' + my_user + ' ' + bot_found);
    return bot_found;
};
