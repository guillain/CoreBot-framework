# CoreBot as chatbot framework
Chatbot framework is based on botkit and writte in nodejs.
The idea is to provide a simple package compatible with the most of business messaging.
In that case the features and/or sketchs developped are fully compatible with all environments and made the devepoment reusable in the futurs integrations.

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
- NLP provided by [LUIS](https://botkit.ai/docs/readme-middlewares.html) via the botkit feature
- Google transaltion
- BigData connector (to send info/tracking/APM data or search)
- CSV file management
- autoreply (like echo)
- button

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

- `DEBUG=* node app/jabber.py`
- `DEBUG=* node app/spark.py`
- `DEBUG=* node app/slack.py`
- `DEBUG=* node app/hangout.py`
- `DEBUG=* node app/teams.py`

`Control+C` to exit

#### PM2
Run as daemon (recommanded) 

- `pm2 start app/jabber.py`
- `pm2 start app/spark.py`
- `pm2 start app/slack.py`
- `pm2 start app/hangout.py`
- `pm2 start app/teams.py`

Status
- `pm2 status`

Stop
- `pm2 stop jabber spark slack`

Delete
- `pm2 delete jabber spark slack`

Masse operation
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

