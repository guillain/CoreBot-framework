# Library
To provide standard functions, it has been put in a folder named `lib` scripts that can be helpful.

We can imagine the following categorization:

1/ core: the scripts used by the framework to manage the chatbot solution
- config.js: create the global configuration object
- controller.js: to preload all *hears* and *on* controllers
- controller_action.js: to load dynamically all *action* controllers
- launcher.js: to load all *launchers*
- security.js: to check the ACL and privileges rules

2/ tools: the scripts that provide facilities (useful when need module is need) 
- csv.js: function to manage CSV data & file
- log.js: generic logger wih severity and console +/- log management
- redis.js: main db used by the framework
- stanza.js: to format the output (text/html message)
- user.js: provides user info management
