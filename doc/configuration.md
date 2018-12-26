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
- Launcher: Configuration embedded for the following business messaging
  - Slack
  - Cisco Jabber
  - Cisco Webex Teams
  ...
- Module: Extra features
  - Translate (google)
  - bigdata
  ...
- Controller: How can I manage my event
  - on
    - message
    - space
    - mention
    ...
  - hears
    - convo
    - thread
    - autoreply
    ...

Now just up to you to write your sketch by configuring the json file
and if need add your own feature.
You can pickup some example as GetStarted and to be forked for your own ;-)

