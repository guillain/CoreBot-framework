# Launcher
They are used to start one daemon by business messaging desired.

It's the starting point of the application!

## Loading
The launcher are started with the [loader](./launcher/loader.js) script
during the main startup process.
The first check is to know if the launcher is activate or not and
depending of the global, specific or default configuration the launcher
is started or not.

## Execution
After the start the launcher are autonomous and don't need specific
attention.
During the first execution steps, we can see in the log or the console
the Controller loaded.

## Composition
They are define in dedicated folder and they need at least the
following files:
- Module name
  - *stanza.js*: Scripts with the code
  - *conf.js*: Default configuration file

They are located in the './module' folder.

## Editors' url to get doc & token

- Google hangout chatbot
  - https://developers.google.com/hangouts/chat/how-tos/bots-publish
  - https://console.developers.google.com/apis/library/chat.googleapis.com
- Cisco Webex Teams
  - https://developer.webex.com/my-apps


## Example
### run.jss
```
// Load tools library
let tools = require(__basedir + 'lib/tools');

// Load Botkit library
var Botkit = require(__basedir + 'botkit/lib/Botkit.js');

// Execute the main function
exports.run = function(config) {
  let controller = Botkit.web({
    debug: config.log.debug,
    studio_token: config.controller.on.botkit.token
  });

  let bot = controller.spawn({
    token: config.web.token
  }).startRTM();


  // Scenario declarations
  let scenario = require(__basedir + 'controller/loader.js');
  controller = scenario.run(controller);
  return controller;
};

```
### conf.json
```
{
    "launcher": {
        "MyLauncher": {
            "enable": true,
            "name": "corebot-framework",
            "msg": {
                "help": [
                    "MyLauncher help"
                ]
            }
        }
    }
}
```
