# Conroller
They are used to add listener and have categorized event (bot/msg)

It's here where you can allow only 1:1 dialog or maybe only group chat.

To do that, three methods:
- *hears*: message pattern and context validation, loaded during the init
- *on*: group event categorization, loaded during the init
- *action*: action to execute, loaded by the *on* controller

## Loading
The hears and on controllers are loaded during the bot initialization
with the [loader](./controller/loader.js) script.
The action controllers are loaded after an On controller evenet.

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

## Features
### Hears
Check if the message match with the pattern and the context
- ./app/controller/hears

Hears controller contains two specific options to be used by the loader the template:
```
  "listener": {
    "pattern": ["^myfeature$", "[0-9]*5"],
    "from": ["direct_message", "group_message"]
  }
```
#### run.js
```
// Exports controller function as scenario
exports.MyCtrHears_on = function(controller, bot, message, config) {
    bot.reply(message, config.controller.on.MyCtrHears_on.msg.on);
};
exports.MyCtrHears_off = function(controller, bot, message, config) {
    bot.reply(message, config.controller.on.MyCtrHears_on.msg.off);
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
                    "MyCtrHears_on": {
                        "pattern": ["^MyMessage on$"],
                        "from": ["direct_message"]
                    },
                    "MyCtrHears_off": {
                        "pattern": ["^MyMessage off$"],
                        "from": ["direct_message"]
                    }
                },
                "msg": {
                    "on": "it's on on",
                    "off": "it's on off",
                    "help": [
                        "MyCtrHears is to switch on off when on on and on on when on off"
                    ]
                }
            }
        }
    }
}
```
### On
Will be triggered for a dedicated context and will call the *action* 
loader main script.
- ./app/controller/on

  On controller contains one specific option to be used by the loader the template:
```
  "listener": {
    "from": ["direct_message", "group_message"]
  }
```
#### run.js
```
// Exports controller function as scenario
exports.MyCtrOn = function(controller, bot, message, config) {
    bot.reply(message, config.controller.on.MyCtrOn.msg.text
        + message.user
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
                    "text": "hello",
                    "help": [
                        "MyOnController help"
                    ]
                }
            }
        }
    }
}
```

### Action
Will be executed by the *on* controller.
- ./app/controller/on

They are loaded via a common script who provides also the function
template: ./app/controller/action/loader.js

#### run.js
```
exports.MyCtrOn = function(controller, bot, message, config) {
    bot.reply(message, config.controller.on.MyAction.msg.text);
};
```
#### conf.json
```
{
    "controller": {
        "on":
            "MyAction": {
                "enable": true,
                "msg": {
                    "text": "hello",
                    "help": [
                        "MyAction help"
                    ]
                }
            }
        }
    }
}
```

