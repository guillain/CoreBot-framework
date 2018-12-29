# Security
Security has been integrated as standard feature in the framework.
Two ACL methods have been provided but both work on the access filtering.

Both use the conjunction of:
- the global configuration: provides a static list preset
- the controller configuration: pickup preset according to the need

Additionnaly *security* is in charge of removing bot reply, avoiding infinity loop.

## access_list
In the global configuration, we declare all *access_list* can be used by our scenarios.

We keep always the *default* configuration to avoid any issue and having a global method to adapt the conf.
By default it *allow* all messages.

According to your need and deployment, it can be interesting to have a library managing ACL.

Example of configuration to filter on domains:
```
    "access_list": {
        "default": {
            "pattern": ["*"],
            "permission": "allow"
        },
        "domain_allowed": {
            "pattern": ["@domain1.com", "@domain1.com"],
            "permission": "allow"
        },
        "domain_blocked": {
            "pattern": ["@domain3.com", "@domain4.com"],
            "permission": "block"
        }
    }
```

Now we can use that in all listener controllers configuration (valid on hears, on and action controller). Example:
```
{
    "controller": {
        "hears": {
            "MyDomain": {
                "enable": true,
                "listener": {
                    "MyDomain": {
                        ...
                        "access_list": ["domain_allowed", "domain_blocked"]
                    }
                }
                ...
```


## User filtering and privilege
In the global configuration, we declare all *user* that have an interest in the application.

It can be the case for example to allow *admin* privilege or block specific people.

We keep always the *default* configuration to avoid any issue and having a global method to adapt the conf.
By default it assigns the *user* privilege (role) to all peoples (... not declared).

Example of a configuration to allow by default standard *user* role, *admin* to user1 ad *block* the user2:
```
    "user": {
        "default": {
            "mail": "default@mail.com",
            "privilege": "user"
        },
        "user1": {
            "mail": "user1@mail.com",
            "privilege": "admin"
        },
        "user2": {
            "mail": "user2@mail.com",
            "privilege": "block"
        }
    }
```

Now in the controller configuration we can declare which role is required to have the chance to run the listener of the controller:
```
{
    "controller": {
        "hears": {
            "API": {
                "enable": true,
                "listener": {
                    "get": {
                        "pattern": ["^get"],
                        "from": ["message_received"],
                        "privilege": ["user"],
                        "access_list": ["default"]
                    },
                    "post": {
                        "pattern": ["^post"],
                        "from": ["message_received"],
                        "privilege": ["admin"],
                        "access_list": ["default"]
                    }
                    ...
```
PS if you need to manage the full directory it can be easier to fork this feature for openLDAP integration
(for example :-))

## Bot reply elimination
To avoid infinity loop in the scenario it's important to pay attention to who send the message 
and the next analyze to perform on it.

Even if *botkit* already provides a mechanism like that with the *self_messsage* from parameter 
some time it's to light for our integration and we need more powerful features or the assurance 
to avoid infinity loop (ie an production application can't be garantee and specifically when you 
use hyperscaler provider...).

To clean the messages, the framework use the field *name* of the *launcher controller* configuration.
A list is build with all launcher configuration and all names are checked.
In that case independently of your launcher editor you can set the dedicated name of the bot 
deployed in specific environment or editor.

