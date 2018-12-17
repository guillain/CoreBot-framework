# Module
They are used to add feature to the bot.

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
