# Module
They are used as responsive reply of the bot.

It's the logic used when the bot will received your message.

Some presets exist but of course, create your own ;-)

# Composition
They are define in dedicated folder and they need the following files:
- Module name
  - *run.js*: Scripts with the code
  - *conf.js*: Default configuration file

They are located in the './module' folder.

## Loading
The modules are loaded with the [loader](./module/loader.js) script.
The first check is to know if the module is activate or not and
depending of the global, specific or default configuration the module is
loaded or not.

## Execution
The module receives the bot message and context.
Based on these information modules can support many feature as
historical report, API callback, scenario... and can be for the frontend
or the backend.
