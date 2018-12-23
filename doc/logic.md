# Logic
The idea here is to describe the framework logic and how globally it
works.

Basically, the following order is applied on a scenario:
1/ Launcher: start the daemon for a specific Business Messaging
2/ Controller: loaded during the start-up

## Launcher
The starter comes with the *launcher* (app/launcher) and it's use to run
the daemon who will serve the chatbot services.

Each Business messaging are describes with one standard files structure
(cf. the [configuration](doc/configuration.md) doc.

[Controller](./doc/controller.md) doc may be also useful ;-)

## Controller
It will perform an analysis of the message context and bring it up to
the corresponding *hears* or *on* actioner.

[Module](./doc/module.md) doc may be also useful ;-)
