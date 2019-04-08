// Load tools library
var Log = require(__basedir + 'lib/log');
var User = require(__basedir + 'lib/user');

// Exports controller function as scenario
exports.hello = function(controller, bot, message, config, mod_conf) {
  User.get_user_details(controller, message, function (user) {
    if (user.firstName) {
      bot.reply(
        message,
        "Hello "
        + user.firstName
        + ", I am here to help you. Type help for further information."
      );
    } else if (user.displayName) {
      bot.reply(
        message,
        "Hello "
        + user.displayName
        + ", I am here to help you. Type help for further information."
      );
    } else {
      bot.reply(
        message,
        "Hello"
        + ", I am here to help you. Type help for further information."
      );
    }
  })
};
