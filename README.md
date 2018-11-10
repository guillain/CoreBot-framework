# CoreBot as chatbot framework
Chatbot framework is based on botkit and writte in nodejs.
The idea is to provide a simple package compatible with the most of business messaging.
In that case the features and/or sketchs developped are fully compatible with all environments and made the devepoment reusable in the futurs integrations.

Generic setup is done to support the following business messaging solution:
- Jabber
- Cisco Webex Teams (Cisco Spark)
- Microsoft Teams
- Slack
- Google Chat
- Hangout

## Features
- Google transaltion
- BigData connector (to send info/tracking/APM data or search)
- CSV file management
- autoreply (like echo)
- button

Don't hesitate to share yours ;-)

## Configuration
Copy the file `config.js.template` to `config.js` and edit it according to your env.
`cp config.js.template config.js`
`vi config.js`

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

Now just you to write your sketch.
You can pickup some example as GetStarted and to be forked for your own ;-)

## Installation
Get the project
` git clone https://github.com/guillain/CoreBot-framework.git`

Move into
`cd CoreBot-framework`

### Standalone server
Installation dependencies
`npm install`

#### Node 
Run it manually (debug/dev)
`DEBUG=* node app/jabber.py`
or
`DEBUG=* node app/spark.py`
or
`DEBUG=* node app/slack.py`
or
`DEBUG=* node app/hangout.py`
or
`DEBUG=* node app/teams.py`

Control+C to exit

#### PM2
Run as daemon (recommanded)
`pm2 start app/jabber.py`
and/or
`pm2 start app/spark.py`
and/or
`pm2 start app/slack.py`
and/or
`pm2 start app/hangout.py`
and/or
`pm2 start app/teams.py`

Status
`pm2 status`

Stop
`pm2 stop jabber spark slack`

Delete
`pm2 delete jabber spark slack`

Masse operation
`pm2 start all`
`pm2 stop all`
`pm2 reset all`

### Docker image
The image is provided by AWS with specific account. 
Thanks to request access before and use the `image` script to do that easily ;-)

Login in your AWS env.
`aws configure`

Get the image
`./image get`

Run the container with the image
`./image run`

Get the status
`./image status`

## Tips

Redis local record issue
`redis-cli> config set stop-writes-on-bgsave-error no`

