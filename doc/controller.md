# Controller
They are used to add features and create scenario based on *hears*, *on* 
and *action* controllers.

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
  - triggered after an *on* controller event
  - action to execute
  - loaded by the *on* controller by `./app/lib/controller.js`

## Loading
### Configuration
The configuration is generated during the program initialisation.
For more detail on the configuration, thanks to consult the doc [configuration](./doc/configuration.md).

The configuration is generated from (and by priority):
- 1/ the global configuration file `./app/conf/config.json`
- 2/ the global controller configuration file `./app/conf/controller.json`
- 3/ the controller configuration files:
  - a) for the listener `./app/controller/[hears,on,action]/[name]/default.json`
  - b) for the conf `./app/controller/[hears,on,action]/[name]/conf.json`

### Execution
The *hears* and *on* controllers are loaded during the bot initialization.
The *action* controllers are loaded after an On controller event.
All are managed by the `./app/lib/controller.js` script.

The first check is to know if the controller is activate or not and
depending of the configuration the controller is loaded or not.

## Organization
The controllers are define in dedicated folder and they need the following files:
- `run.js`: Scripts with the code
- `conf.json`: Default configuration file for the specific controller 
- `default.json`: Default listener provide for support and example

They are located in the `./app/controller` folder.
    - `conf.json`: Default configuration file of the controller

## Structures
All hears, on and action controllers are define with the same JSON configuration template and 
 they include the following structured fields.

### Listener
```
    "listener": {
        "pattern": ["^myfeature$", "[0-9]*5"],
        "from": ["direct_message", "group_message"],
        "privilege": ["user"],
        "access_list": ["default"],
        "remove_pattern": true
    }
```
On controller contains three specific options to be used by the loader the template:
- pattern: array of regular expression. It must match with the chat to trigger the *hears* controller
- from: array of sources of message. It must match with the chat context to trigger the controller
- privilege: array of privilege (role). It must be associated with existing people or with the default one
- access_list: array of ACL. It must match with existing access_list declared in the global configuration file.
- remove_pattern: to know if the pattern should be considered or not (ie removing the pattern from the chat message) 

### Message
A structured message fields is used to improve support features deliver to the end user.
All bot messages are provided by the JSON configuration files and specific structure is applied for
the help message.
```
    "msg": {
        "help": [
            "MyCtrHears is to switch on off when on on and on on when on off\n",
            "-  **arg1**: my arg1 definition",
            "-  **arg2**: my arg2 definition",
            "_Example_: `help`, `help arg1 arg2`"
        ]
    }
```

## Control definition
Provide an example of the diffrentes configurations that can be provided for each controller and each 
script and configuration files possibilities:
- run.js: the standard script
- conf.js: the controller conf, useful to create new one
- default: the controller listener, useful to create new one
- config.json: all conf in one file, useful to reuse an existing one
 
### Hears
Check if the message match with the pattern and the context
- `./app/controller/hears`

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
    "enable": true,
    "msg": {
        "on": "it's on on",
        "off": "it's on off",
        "help": [
            "MyCtrHears is to switch on off when on on and on on when on off"
        ]
    }
}
```
#### default.json
```
{
    "controller": {
        "hears":
            "MyCtrHears": {
                "enable": true,
                "listerner": {
                    "MyCtrHears_on": {
                        "controller" "hears",
                        "pattern": ["^MyMessage on$"],
                        "from": ["direct_message"],
                        "privilege": ["user"],
                        "access_list": ["default"],
                        "remove_pattern": true
                    },
                    "MyCtrHears_off": {
                        "controller" "hears",
                        "pattern": ["^MyMessage off$"],
                        "from": ["direct_message"],
                        "privilege": ["user"],
                        "access_list": ["default"],
                        "remove_pattern": true
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
#### config.json
```
{
    "controller": {
        "hears":
            "MyCtrHears": {
                "enable": true,
                "listerner": {
                    "MyCtrHears_on": {
                        "pattern": ["^MyMessage on$"],
                        "from": ["direct_message"],
                        "privilege": ["user"],
                        "access_list": ["default"],
                        "remove_pattern": true
                    },
                    "MyCtrHears_off": {
                        "pattern": ["^MyMessage off$"],
                        "from": ["direct_message"],
                        "privilege": ["user"],
                        "access_list": ["default"],
                        "remove_pattern": true
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
    "msg": {
        "text": "hello",
        "help": [
            "MyOnController help"
        ]
    }
}
```
#### default.json
```
{
    "enable": true,
    "listerner": {
        "MyCtrOn": {
            "controller" "on",
            "from": ["direct_message"],
            "privilege": ["user"],
            "access_list": ["default"]
        }
    }
}
```
#### config.json
```
{
    "controller": {
        "on":
            "MyCtrOn": {
                "enable": true,
                "listerner": {
                    "MyCtrOn": {
                        "from": ["direct_message"],
                        "privilege": ["user"],
                        "access_list": ["default"]
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

#### run.js
```
exports.MyCtrOn = function(controller, bot, message, config) {
    bot.reply(message, config.controller.on.MyAction.msg.text);
};
```
#### conf.json
```
{
    "msg": {
        "text": "hello",
        "help": [
            "MyAction help"
        ]
    }
}
```
#### default.json
```
{
    "enable": true,
    "listerner": {
        "MyAction": {
            "controller" "action",
            "privilege": ["user"],
            "access_list": ["default"],
            "remove_pattern": true
        }
    }
}
```
#### config.json
```
{
    "controller": {
        "on":
            "MyAction": {
                "enable": true,
                "listerner": {
                    "MyAction": {
                        "privilege": ["user"],
                        "access_list": ["default"],
                        "remove_pattern": true
                    }
                },
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
