// Load CoreBot libraries
let tools = require(__basedir + 'lib/tools');

// Exports controller function as scenario
exports.whoami= function(controller, bot, message, config) {
    bot.reply(message,
        'You are ' + message.user
        + ' and your email is ' + message.data.personEmail
        + ' and your user id is ' + message.data.personId);
};
