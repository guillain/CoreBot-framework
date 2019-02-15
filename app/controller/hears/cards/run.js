// Load tools library
var Log = require(__basedir + 'lib/log');

// Exports controller function as scenario
exports.cards = function(controller, bot, message, config, mod_conf) {
    bot.reply(message, {
        requestBody: {
            cards: [
                {
                    "sections": [
                        {
                            "widgets": [
                                {
                                    "image": {
                                        "imageUrl": mod_conf.image_url
                                    }
                                },
                                {
                                    "buttons": [
                                        {
                                            "textButton": {
                                                "text": mod_conf.msg.text,
                                                "onClick": {
                                                    "openLink": {
                                                        "url": mod_conf.open_link
                                                    }
                                                }
                                            }
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    });
};
