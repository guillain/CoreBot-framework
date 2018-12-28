# Controller
They are used to add feature and create scenario based on hears, on and action controllers.

To do that, three methods:
- *hears*: 
  - triggered by message
  - message pattern and context validation
  - loaded during the init by `./app/lib/controller.js`
- *on*: 
  - triggered by message
  - group event categorization
  - loaded during the init by `./app/lib/controller.js`
- *action*: 
  - triggered by *on* controller 
  - action to execute
  - loaded by the *on* controller by `./app/lib/controller_action.js`

## Loading
The hears and on controllers are loaded during the bot initialization
with the `./app/lib/controller.js` script.
The action controllers are loaded after an On controller event.

The first check is to know if the controller is activate or not and
depending of the global or default configuration the controller
is loaded or not.

## Organization
The controllers are define in dedicated folder and they need the following files:
- Controller name
  - hears or on or action
    - `run.js`: Scripts with the code
    - `conf.js`: Default configuration file

They are located in the `./app/controller` folder.

The JSON configuration file associate define the default configuration of the
feature and its standard parameters plus the default behaviors.
This can be overloaded by the global settings.
It also follow the folder structure and so the controller chain/path and 
its declaration.

## Features
### Hears
Check if the message match with the pattern and the context
- `./app/controller/hears`

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
- `./app/controller/on`

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
- `./app/controller/action`

They are loaded via a common script who provides also the function
template: `./app/lib/controller_action.js`

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

