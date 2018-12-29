# CoreBot as chatbot framework
Chatbot framework based on **[botkit](https://botkit.ai/)**.

The idea is to provide a simple solution compatible with the most of
business messaging. This must be easy to deploy, set and maintain.
In that case the features and/or sketches developed are fully
compatible with all environments and made the development reusable in
the futures integrations.

Instead to code to create and deploy our chatbot with its own scenario,
build it by configuration!

## Advantage
- Generic setup is done to support all environment and settings
- Business messaging compatibilities:
    - Web (web server included)
    - Jabber
    - Cisco Webex Teams (Cisco Spark)
    - Microsoft Teams
    - Slack
    - Google Hangout
- The security is natively integrated with access list and privilege
management on controller and user level.
- All features can be used on controller level (preload) or when event
is triggered (loaded dynamically)
- Standard libraries to create quickly and properly new feature
- The configuration can be provided in a single file
[config.json](app/conf/config.json) or in splitted files. The configuration
can overload the default configuration of each feature.

## Features
All features are stored in the *controller* folders and they're loaded
with the help of a common script.

The non-exhaustive list is hereafter:
- NLP provided by [LUIS](https://botkit.ai/docs/readme-middlewares.html)
via the botkit feature
- Google translation
- BigData connector (to send info/tracking/APM data to a datalake)
- CSV file management
- autoreply (like echo)
- survey
- button
- ...

## Pre requisites
1/ Python
  - 2.7
  - 3.5
2/ Redis server
3/ Internet access (Business Messaging and additional API)

## Fast Run
1/ Clone the project:
`git clone https://github.com/guillain/CoreBot-framework.git`

2/ Create the config file for your env and scenario:
`vi CoreBot-framework/app/conf/config.json`

3/ Run it:
 `
  - If you run on docker:
  `cd CoreBot-framework && ./image build && ./image run`

  - If you run locally:
  `cd CoreBot-framework/app && npm install & pm2 start CoreBot-framework.js`

## Configuration
Thanks to read this [doc of configuration](./doc/configuration.md).

## Installation
Thanks to read this [doc of installation](./doc/installation.md).

To jump in the framework's logic, follow this [doc](./doc/logic.md).

## How to add new feature?
Thanks to read the [HowTo add new](./doc/add_new.md) doc to have get
the complete details of the standard and template to use.

If need you can complete your framework knowledge with the following
ones:

- [Framework Logic](./doc/logic.md)

- [Controller](./doc/controller.md)

- [Security](./doc/security.md)


Don't hesitate to share yours creation ;-)

## Tips
Redis local record issue
- `redis-cli> config set stop-writes-on-bgsave-error no`

