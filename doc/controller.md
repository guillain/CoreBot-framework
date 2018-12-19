# Conroller
They are used to add listener and have categorized event (bot/msg)

It's here where you can allow only 1:1 dialog or maybe only group chat.

To do that, two methods:
- *hears*: specific message pattern
- *on*: group event categorization

## Loading
The modules are loaded with the [loader](./controller/loader.js) script.
The first check is to know if the module is activate or not and
depending of the global, specific or default configuration the module is
loaded or not.

## Execution

## Composition
They are define in dedicated folder and they need the following files:
- Controller name
  - hears or on
    - *run.js*: Scripts with the code
    - *conf.js*: Default configuration file

They are located in the './controller' folder.

## Example
### Hears
#### run.js
```
// Exports controller function as scenario
exports.run = function(controller, config) {
    controller.hears('who am i', ['direct_message', 'direct_mention'], function (bot, message) {
        bot.reply(message,
            'You are ' + message.user
            + ' and your email is ' + message.data.personEmail
            + ' and your user id is ' + message.data.personId);
    });
    return controller;
};
```
#### conf.json
```
{
    "controller": {
        "hears":
            "MyHearsController": {
                "enable": true,
                "msg": {
                    "help": [
                        "MyHearsController help"
                    ]
                }
            }
        }
    }
}
```
### On
#### run.js
```
// Load the required libraries
let mod_loader = require(__basedir + 'module/loader.js');

// Exports controller function as scenario
exports.run = function(controller, config) {
    controller.on('direct_mention', function (bot, message) {
        if (message.text['0'] === config.name) {
            message.text.splice(0, 1);
        }
        mod_loader.run(controller, 'direct_mention', message, bot, config)
    });
    return controller;
};
```
#### conf.json
```
{
    "controller": {
        "on":
            "MyOnController": {
                "enable": true,
                "msg": {
                    "help": [
                        "MyOnController help"
                    ]
                }
            }
        }
    }
}
```
