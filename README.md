# CoreBot as chatbot framework
Chatbot framework based on **[botkit](https://botkit.ai/)**.

The idea is to provide a simple package compatible with the most of
business messaging easy to deploy, set and maintain.
In that case the features and/or sketches developed are fully
compatible with all environments and made the development reusable in
the futures integrations.

## Advantage
Generic setup is done to support the following business messaging
solution:
- Jabber
- Cisco Webex Teams (Cisco Spark)
- Microsoft Teams
- Slack
- Google Hangout
- Web (web server included)

Standard libraries to be reused with plug-and-conf mode.

All configurations in a single file [config.json](app/conf/config.json)
who overload each single feature configuration.

You can create your own scenario by using existing module and compose
a new sketch or by developing dedicated one.

The configuration is taken dynamically so no need to restart anything,
when your sketches are updated, your bots also ;-)

## Pre requisites
1/ Python
  - 2.7
  - 3.5
2/ Redis server
3/ Internet access (Business Messaging and additional API)

## Fast Run
1/ Clone the project:
`git clone https://github.com/guillain/CoreBot-framework.git`

2/ Adapt the config file to your env and scenario:
`vi CoreBot-framework/app/conf/config.json`

3/ Run it:
 `
  - If you run on docker:
  `cd CoreBot-framework && ./image build && ./image run`

  - If you run locally:
  `cd CoreBot-framework/app && npm install & pm2 start CoreBot-framework.js`

## Configuration
Thanks to read this [configuration](./doc/configuration.md) doc.

## Installation
Thanks to read this [installation](./doc/installation.md) doc.

## Features
All features are stored in the *feature* folder and they're loaded
with the help of a common script.

The non-exhaustive list is hereafter:
- NLP provided by [LUIS](https://botkit.ai/docs/readme-middlewares.html)
via the botkit feature
- Google translation
- BigData connector (to send info/tracking/APM data or search)
- CSV file management
- autoreply (like echo)
- button
- ...

To jump in the framework's logic, follow this [doc](./doc/logic.md).

## How to add new feature?
Thanks to read the [HowTo add new](./doc/add_new.md) doc to have get
the complete details of the standard and template to use.

If need you can complete your framework knowledge with the following
ones:

0/ [Framework Logic](./doc/logic.md)

1/ [Controller](./doc/controller.md)

2/ [Module](./doc/module.md)


Don't hesitate to share yours creation ;-)

## Tips
Redis local record issue
- `redis-cli> config set stop-writes-on-bgsave-error no`

