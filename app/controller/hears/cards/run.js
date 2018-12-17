// Exports controller function as scenario
exports.run = function(controller, config) {
    if (config.controller.hears.cards.enable === true) {
        controller.hears('cards', 'message_received', function (bot, message) {
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
        });
    }
    return controller;
};
