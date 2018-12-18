# Installation
Install and configure Redis-server as your needs and start prior to run the CoreBot

Get the project
- ` git clone https://github.com/guillain/CoreBot-framework.git`

Move into
- `cd CoreBot-framework`

### Standalone server
- Redis server installation: https://redis.io/topics/quickstart
- Installation NodeJS dependencies: `npm install app/package.json`

#### Node
Run it manually (debug/dev):
- `DEBUG=* node app/CoreBot-framework.js`

Or one by one:
- `DEBUG=* node app/launcher/jabber.py`
- `DEBUG=* node app/launcher/spark.py`
- `DEBUG=* node app/launcher/slack.py`
- `DEBUG=* node app/launcher/hangout.py`
- `DEBUG=* node app/launcher/teams.py`

`Control+C` to exit

#### PM2
Run as daemon (recommanded)
- `pm2 start app/CoreBot-framework.js`

Or one by one:
- `pm2 start app/launcher/jabber.py`
- `pm2 start app/launcher/spark.py`
- `pm2 start app/launcher/slack.py`
- `pm2 start app/launcher/hangout.py`
- `pm2 start app/launcher/teams.py`

Status
- `pm2 status`

Stop
- `pm2 stop CoreBot-framework`

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
