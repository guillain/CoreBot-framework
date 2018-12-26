# Conroller
They are used to add listener and have categorized event (bot/msg)

It's here where you can allow only 1:1 dialog or maybe only group chat.

To do that, three methods:
- *hears*: specific message pattern, loaded during the init
- *on*: group event categorization, loaded during the init
- *action*: action to execute, loaded dynamically

## Loading
The hears and on controllers are loaded during the bot initialization
with the [loader](./controller/loader.js) script.
The action controller are loaded during the execution.

The first check is to know if the controller is activate or not and
depending of the global, specific or default configuration the controller
is loaded or not.

## Composition
They are define in dedicated folder and they need the following files:
- Controller name
  - hears or on or action
    - *run.js*: Scripts with the code
    - *conf.js*: Default configuration file

They are located in the './controller' folder.

## Example
### Hears
#### run.js
```
// Exports controller function as scenario
exports.MyCtrHears = function(controller, bot, message, config) {
    bot.reply(message,
        'You are ' + message.user
        + ' and your email is ' + message.data.personEmail
        + ' and your user id is ' + message.data.personId);
    )
};
```
#### conf.json
```
{
    "controller": {
        "hears":
            "MyCtrHears": {
                "enable": true,
                "listerner": {
                    "MyCtrHears": {
                        "pattern": ["MyMessage"],
                        "from": ["direct_message"]
                    }
                },
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
// Exports controller function as scenario
exports.MyCtrOn = function(controller, bot, message, config) {
    bot.reply(message,
        'You are ' + message.user
        + ' and your email is ' + message.data.personEmail
        + ' and your user id is ' + message.data.personId);
    )
};
```
#### conf.json
```
{
    "controller": {
        "on":
            "MyCtrOn": {
                "enable": true,
                "listerner": {
                    "MyCtrOn": {
                        "from": ["direct_message"]
                    }
                },
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
