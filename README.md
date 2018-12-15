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

All configurations, feature activation included, in the single file [config.js](app/config.js)

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

Don't hesitate to share yours ;-)

## Configuration
Adapt the config file `config.js` and edit it according to your env.

- Bot conf 
- BigData collector
- Configuration embeded for the following business messaging:
  - Slack
  - Cisco Jabber
  - Cisco Webex Teams
  ...
- Features conf
  - Translate (google)
  - bigdata
  - autoreply
  ...

Now just up to you to write your sketch.
You can pickup some example as GetStarted and to be forked for your own ;-)

## Installation
Install and configure Redis-server as your needs and start prior to run the CoreBot

Get the project
- ` git clone https://github.com/guillain/CoreBot-framework.git`

Move into
- `cd CoreBot-framework`

### Standalone server
- Installation dependencies
`npm install`

#### Node 
Run it manually (debug/dev)

- `DEBUG=* node app/launcher/jabber.py`
- `DEBUG=* node app/launcher/spark.py`
- `DEBUG=* node app/launcher/slack.py`
- `DEBUG=* node app/launcher/hangout.py`
- `DEBUG=* node app/launcher/teams.py`

`Control+C` to exit

#### PM2
Run as daemon (recommanded) 

- `pm2 start app/launcher/jabber.py`
- `pm2 start app/launcher/spark.py`
- `pm2 start app/launcher/slack.py`
- `pm2 start app/launcher/hangout.py`
- `pm2 start app/launcher/teams.py`

Status
- `pm2 status`

Stop
- `pm2 stop jabber spark slack`

Delete
- `pm2 delete jabber spark slack`

Mass operation
- `pm2 start all`
- `pm2 stop all`
- `pm2 reset all`

### Docker image
The image is provided by AWS with specific account. 
Thanks to request access before and use the `image` script to do that easily ;-)

Login in your AWS env.
`aws configure`

Get the image
- `./image get`

Run the container with the image
- `./image run`

Get the status
- `./image status`

## Tips

Redis local record issue
- `redis-cli> config set stop-writes-on-bgsave-error no`

