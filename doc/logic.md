# Logic
The idea here is to describe the framework logic and how globally it
works.

## In summary
```
Main -> loader(launcher) -> ACL(loader(controller.hears)) -> controller.hears[feature].listener[feature_function]
                         -> ACL(loader(controller.on))    -> ACL(loader(controller.action))
```

## Loader
Loader scripts are used for the following part:
- launcher: `./app/lib/launcher.js`
- controller: `./app/lib/controller.js`
- controller.action: `./app/lib/controller_action.js`

They have been create for:
- mass treatment (loop over JSON definition = folder structure)
- function template

=> flexibility and scalability

Basically, the following order is applied on a scenario:
# 0/ Main
One script to execute the solution
- ./app/CoreBot-framework.js

It generates the global configuration and loads each launcher via
a single script `./app/lib/launcher.js` with the configuration.

# 1/ Launcher
Start the daemon for a specific Business Messaging
- ./app/launcher/

Each launcher is describe with the help of the standard files 
(cf. [configuration](doc/configuration.md) and it is executed or not 
following the `enable` option.

Each launcher starts the hears and on contollers via a single
script `./app/lib/controller.js`
   
# 2/ Controller: loaded during the start-up
- ./app/controller/

The hears and on controllers are loaded via the script
`./app/lib/controller.js`.
The action controllers are loaded via the script
`./app/lib/controller_action.js`.
Both provide template to create the controllers or the action.
For example the method to load or not the controller, the security and
ACL, the pattern and form configuration...

Each controller is describe with the help of the standard files
(cf. [configuration](doc/configuration.md) and it is executed or not
following the `enable` option.

a) Hears: Check if the message match with the pattern and the context
b) On: Will be triggered for a dedicated context
    i. Action: Are ordered folowing an On controller event

Complete doc can be found here [Controller](./doc/controller.md).
