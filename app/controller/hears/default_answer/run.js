// Load required library
var Log = require(__basedir + 'lib/log');
var _ = require("underscore");

// Simple greetins request: list of activate controller instead if all is requested
exports.default_answer = function(controller, bot, message, config, mod_conf) {
    var to_say = '';
	
	 controller.api.people.get({ personId: message.data.personId }).then(function (people) {
		
		peopleName = (people.nickName == "") ? people.firstName : people.nickName
		
		to_say += "Sorry "+peopleName+", I didn't quite understand what you are trying to say ; can you please rephrase or check what I am capable of by typing \"help\""
		
		// Bot Reply
		if (to_say) bot.reply(message, to_say);
		else        bot.reply(message, mod_conf.msg.module_not_found);

		
    });
	
	

};
