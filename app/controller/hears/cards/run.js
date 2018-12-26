// Load tools library
let tools = require(__basedir + 'lib/tools');

// Exports controller function as scenario
exports.cards = function(bot, message, config) {
    bot.reply(message, {
        requestBody: {
            cards: [
                {
                    "sections": [
                        {
                            "widgets": [
                                {
                                    "image": {
                                        "imageUrl": config.controller.hears.cards.image_url
                                    }
                                },
                                {
                                    "buttons": [
                                        {
                                            "textButton": {
                                                "text": config.controller.hears.cards.msg.text,
                                                "onClick": {
                                                    "openLink": {
                                                        "url": config.controller.hears.cards.open_link
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
