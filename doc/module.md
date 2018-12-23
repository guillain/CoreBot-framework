# Module
They are used as responsive reply of the bot and can be used to build
your own scenario easily.

It's the logic used when the bot will received your message and you need
to describe specific behavior not managed by the controller (ie.
complex scenario).

Some presets exist as AutoReply, Translate... but of course,
create your own ;-)

## Loading
The modules are loaded with the [loader](./module/loader.js) script
when event is triggered via a message.
The first check is to know if the module is activate or not and
depending of the global, specific or default configuration the module is
loaded or not.

## Execution
The module receives the bot message and context.
Based on these information modules can support many feature as
historical report, API callback, scenario... and can be for the frontend
or the backend.

## Composition
They are define in dedicated folder and they need the following files:
- Module name
  - *stanza.js*: Scripts with the code
  - *conf.js*: Default configuration file

They are located in the './module' folder.

## Example
### run.js
```
// Load tools library
let tools = require(__basedir + 'lib/tools');

// Export function
exports.run = function(evt, message, config) {
    // Remove first pattern if: present + prefixed=true
    let msg_arr = message.text.split(' ');

    if (!(/^csv$/i.test(msg_arr['0'])) && (config.module.translate.prefixed === true)){
        tools.debug('debug', 'module translate run return');
        return;
    }

    if (/^csv$/i.test(msg_arr['0'])) {
        tools.debug('debug', 'module csv run mod-name-del');
        msg_arr.shift();
    }

    // order action according to the message content
    if (/^help$/i.test(msg_arr['0']))
        bot.reply(message, config.module.csv.msg.help.join('\n'));
    } else {
        /* My Code */
    }
}
```
### conf.json
```
{
    "module": {
        "MyModule": {
            "enable": true,
            "prefixed": false,
            "msg": {
                "help": [
                    "MyFeature help"
                ]
            }
        }
    }
}
```
