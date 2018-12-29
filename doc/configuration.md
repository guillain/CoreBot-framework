# Configuration

Each Launcher, Module and Controller have them dedicated json
configuration file. These files contain the exhaustive configuration
capabilities of the  Launcher, Module or Controller.

Tips: each Launcher, Module and Controller have them config
file that include the **help**...

To provide an easy method to configure the bot as we wish, one global
configuration file cna be used to overload part or all configuration
preset of the Launcher , Module or Controller.

So just you need to adapt the config file `conf/config.json` and edit it
according to your env.

## Configuration file summary
- Bot conf
- access_list
- user
- Launcher: Configuration embedded for the following business messaging
  - Slack
  - Cisco Jabber
  - Cisco Webex Teams
  ...
- Controller: How can I manage my scenario
  - on
    - message
    - space
    - mention
    ...
  - hears
    - tranlate
    - survey
    - autoreply
    ...

Now just up to you to write your sketch by configuring the json file
and if need add your own feature.
You can pickup some example as GetStarted and to be forked for your own ;-)

## Controller
Thanks to read the doc of the [controller](./doc/controller.md) for a
complete details.

## Launcher
Thanks to read the doc of the [controller](./doc/launcher.md) for a
complete details.

