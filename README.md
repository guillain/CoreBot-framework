# CoreBot as chatbot framework
Chatbot framework is based on **botkit**.

The idea is to provide a simple package compatible with the most of business messaging.
In that case the features and/or sketches developed are fully compatible
with all environments and made the development reusable in the futures integrations.

## Advantage
Generic setup is done to support the following business messaging solution:
- Jabber
- Cisco Webex Teams (Cisco Spark)
- Microsoft Teams
- Slack
- Google Chat
- Hangout

Standard library to be reuse with plug-and-conf mode.

All configurations, feature activation included, in the single file
[config.json](app/config.json) who overload each single feature
configuration. Easy to user only what is need.

The configuration is taken dynamically so no need to restart anything,
when your sketches are updated, your bots also ;-)

## Features
All features are stored in the *feature* folder and they're loaded
with the help of a common script.

The non-exhaustive list is hereafter:
- NLP provided by [LUIS](https://botkit.ai/docs/readme-middlewares.html) via the botkit feature
- Google translation
- BigData connector (to send info/tracking/APM data or search)
- CSV file management
- autoreply (like echo)
- button
- ...

To jump in the framework's logic, follow this [doc](doc/logic.md).

To develop new, follow this [doc](./doc/add_new.md)

Don't hesitate to share yours ;-)

## Configuration
Thanks to read this [configuration](./doc/configuration.md) doc.

## Installation
Thanks to read this [installation](./doc/installation.md) doc.

## How to add new feature?
Thanks to read the [HowTo add new](./doc/add_new.md) doc.

If need you can complete your framework knowledge with the following
ones:

1/ [Controller](./doc/controller.md)

2/ [Module](./doc/module.md)

3/ [Component](./doc/component.md)

## Tips
Redis local record issue
- `redis-cli> config set stop-writes-on-bgsave-error no`

