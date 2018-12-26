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
