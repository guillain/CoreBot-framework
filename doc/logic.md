# Logic
The idea here is to describe the framework logic and how globally it
works.

## In summary
# Schema
```
Main -> loader(launcher) -> loader(controller.hears) -> ACL(controller.hears[module].listener[feature_function])
                         -> loader(controller.on)    -> ACL( loader(controller.action) ) -> ACL(controller.hears.action[module])
```

Script chain
```
cd ./app
./CoreBot-framework.js
  ./lib/launcher.js
    ./launcher/[launcher]/run.js
      ./lib/controller.js
        ./lib/security.js
          ./controller/[control]/[module]/run.js
            << event >>
              ./lib/controller_action.js *
                ./lib/security.js *
                  ./controller/action/[module]/run.js *
*: if the event trigger an action
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
(cf. [configuration](./configuration.md) and it is executed or not 
following the `enable` option.

Each launcher starts the hears and on contollers via a single
script `./app/lib/controller.js`
   
# 2/ Controller: loaded during the start-up
- ./app/controller/

The *hears* and *on* controllers are loaded via the script
`./app/lib/controller.js`.

The *action* controllers are loaded via the script
`./app/lib/controller_action.js`.

Both provide template to create the controllers or the action.
For example the method to load or not the controller, the security and
ACL, the pattern and form configuration...

Each controller is describe with the help of the standard files
(cf. [configuration](./configuration.md) and it is executed or not
following the `enable` option.

a) Hears: Check if the message match with the pattern and the context

b) On: Will be triggered for a dedicated context
    i. Action: Are ordered folowing an On controller event

Complete doc can be found here [Controller](./controller.md).
