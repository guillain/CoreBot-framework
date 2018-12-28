# Installation

### Pre-requisite
1/ Python
  - 2.7
  - 3.5

2/ Redis server

3/ Internet access (Business Messaging and additional API)

### Get the Application

Get the project
- ` git clone https://github.com/guillain/CoreBot-framework.git`

Move into the application folder
- `cd CoreBot-framework/app`

Install packages
- `npm install`

### Standalone server
- Redis server installation: https://redis.io/topics/quickstart
- Installation NodeJS dependencies: `npm install package.json`

#### Node
Run it manually (debug/dev):
- `DEBUG=* node CoreBot-framework.js`

`Control+C` to exit

#### PM2
Run as daemon (recommanded)
- `pm2 start CoreBot-framework.js`

Status
- `pm2 status`

Stop
- `pm2 stop CoreBot-framework`

Delete
- `pm2 delete CoreBot-framework`

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
