# Configuration
The principle is to provide an easy method to set the expected 
chatbot scenario and deploy it to production.

## Info about the config files
All configurations files are stored in the folder `./app/conf`.

Two kinds of configuration files can be used to configure the
chatbot with the expected behavior and scenario:
- the default: 
    - Each Launcher and Controller has a dedicated json
configuration file
    - These files contain the exhaustive configuration
capabilities of the  Launcher or Controller
    - They can be loaded or not with the help of the parameters 
`default.load_controller_listener` in the `config.json` file
- the specific(s):
    - Each Launcher and Controller has a dedicated json
configuration chapter who respect the structure/schema
    - These files contain the exhaustive configuration
capabilities of the  Launcher or Controller and can overload or add
parameters to the default configuration files
    - The main configuration file `config.json` is mandatory and
can provide the full configuration or it can be split in the following
files: 
        - `user.json` 
        - `access_list.json`
        - `launcher.json`
        - `controller.json`

## Configuration file structure
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

Thanks to read the doc of the [controller](./doc/launcher.md) for a
complete details.

## Controller
Provided by the file `config.json` or `controller.json`, it set the
controllers parameters.

Thanks to read the doc of the [controller](./doc/controller.md) for a
complete details.


