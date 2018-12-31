# Configuration
The principle is to provide an easy method to set the expected 
chatbot scenario and deploy it to production.

All configurations files that you need for your scenario are stored in the folder `./app/conf`.

Each *controller* and *launcher* have also them dedicated configuration files.

## Principle
The script `./app/lib/config.js` is in charge to prepare the configuration in he following way:

1/ Load the conf `./app/conf/config.json`. 
This conf can be the full settings or only the main setting.  

2/ Optionally load the referenced files from the previous conf.

The optional files are used to split the initial `config.json` file.
```
    "file": {
        "access_list": "conf/access_list.json",
        "user": "conf/user.json",
        "launcher": "conf/launcher.json",
        "controller": "conf/controller.json"
    }
``` 

3/ Optionally load all `default.json` files found in the `./app/controller` folder.

These conf files are used to preset the listener of the controllers (hears, on and action).
```
    "default": {
        "load_controller_listener": true
    }
```

4/ Optionally load all `conf.json` files found in the `./app/controller` folder

These conf files are used to configure the the controller (hears, on and action).
It should *aways activated* instead if you rewrite or copy/paste all definitions.
```
    "default": {
        "load_controller_conf": true
    }
```

## Where to find the conf files
My personnal and example
- `./app/conf/[*].json`

Launcher
- `./app/launcher/[module name]/conf.json`

Controller

- Controller's global settings
  - `./app/controller/[hears, on, action]/[module name]/conf.json`
- Default listener configuration
  - `./app/controller/[hears, on, action]/[module name]/default.json`

## Configuration file structure
### Overview
```
{
    global configuration,
    access_list: {..},
    user: {...},
    launcher: {...},
    controller: {
        action: {...},
        hears: {...},
        on: {...}
    }
}
```

## Global configuration
Provided by the file `config.json`, it set all global parameters need
by the application.

Some keay features explanation:
- default.load_controller_listener: load or not the default conf (true/false)
- log: logger settings
    - debug: activate the global debug mode
    - verbosity: set log verbosity
        - debug
        - info
        - warn
        - error
        - critic
    - stats_optout: output botkit statistic
    - db: redis db info
    - msg: standard default messages

Example:
```
{
    "file": "CoreBot configuration",
    "author": "guillain",
    "license": "LGPL-3.0",
    "description": [
        "Use this template to create your own chatbot scenario",
        "nothing more is need if you don't need specific feature",
        "and for new feature, read the appropriate doc"
    ],
    "default.load_controller_listener": true,
    "log": {
        "debug": true,
        "verbosity": "debug",
        "file": "log/CoreBot.log"
    },
    "stats_optout": true,
    "db": {
        "host": "172.31.33.243",
        "user": "user"
    },
    "msg": {
        "welcome": "Welcome in the CoreBot-framework tools",
        "bye": "See you soon",
        "join": "Thanks to join us"
    }
}
```

## Access-list
Provided by the file `config.json` or `access_list.json`, it set the
access_list parameters.

Thanks to read the doc of the [security](./doc/security.md) for a
complete details.

## User
Provided by the file `config.json` or `user.json`, it set the user list.

Thanks to read the doc of the [security](./doc/security.md) for a
complete details.

## Launcher
Provided by the file `config.json` or `launcher.json`, it set the
launcher parameters.

Thanks to read the doc of the [launcher](./doc/launcher.md) for a
complete details.

## Controller
Provided by the file `config.json` or `controller.json`, it set the
controllers parameters.

Thanks to read the doc of the [controller](./doc/controller.md) for a
complete details.


