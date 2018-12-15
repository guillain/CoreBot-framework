// Configuration
let config = require('../../config');

// Exports controller function as scenario
exports.run = function(controller) {
    if (config.hears.cards === 1) {
        controller.hears('cards', 'message_received', function (bot, message) {
            bot.reply(message, {
                requestBody: {
                    cards: [
                        {
                            "sections": [
                                {
                                    "widgets": [
                                        {
                                            "image": { "imageUrl": "https://image.slidesharecdn.com/botkitsignal-160526164159/95/build-a-bot-with-botkit-1-638.jpg?cb=1464280993" }
                                        },
                                        {
                                            "buttons": [
                                                {
                                                    "textButton": {
                                                        "text": "Get Started",
                                                        "onClick": {
                                                            "openLink": {
                                                                "url": "https://botkit.ai/docs/"
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
