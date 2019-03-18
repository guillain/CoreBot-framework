// Load tools library
var Log = require(__basedir + 'lib/log');
var User = require(__basedir + 'lib/user');

// Exports controller function as scenario
exports.hello = function(controller, bot, message, config, mod_conf) {
  User.get_user_details(controller, message, function (user) {
    bot.reply(
      message,
      "Hello "
      + (user.firstName?user.firstName:user.displayName)
      + ", I am Dana and I am here to help you. Type help for further information."
    );
  })
};
