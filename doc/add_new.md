# Add new
To add a new feature it needs to create the appropriate folder
(the folder name is the feature name) with the follow files:
- run.js: that's the NodeJS code to perform your wish
- conf.json: that's the configuration file of your feature

To be accessible from the main configuration file, it can be also
interesting to overload the feature configuration in the main file.
In that case you can just copy/paste the interesting part of your local
configuration in the main configuration file.

## What can be feature?
Feature can be a *module* or a *component*.
Both are describes in the same way and respect the same format.

For more details you can jump on these docs:
- [Controller](./doc/xontroller.md)
- [Module](./doc/module.md)

## Template
### Controller
#### run.js
```
// Exports controller function as scenario
exports.run = function(bot, message, controller, config) {
    if (config.controller.on.mention.direct_mention.enable === true) {
        /* MyCode */
    }
}
```
#### conf.json
```
{
    "controller": {
        "on":
            "MyModule": {
                "enable": false,
                "msg": {
                    "help": [
                        "MyFeature help"
                    ]
                }
            }
        }
    }
}
```
### Module
#### run.js
```
exports.switcher = function(evt, message, config) {
    /* My Code */
}
```
#### conf.json
```
{
    "module": {
        "MyModule": {
            "enable": false,
            "msg": {
                "help": [
                    "MyFeature help"
                ]
            }
        }
    }
}
```