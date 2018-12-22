/* Thanks to: Howdyai
 * Url: https://github.com/howdyai/botkit-starter-web/blob/master/components/express_webserver.js
 */
var express = require('express');
var bodyParser = require('body-parser');
var querystring = require('querystring');
var debug = require('debug')('botkit:webserver');
var http = require('http');
var fs = require('fs');
var hbs = require('express-hbs');


module.exports = function(controller, config) {


    var webserver = express();
    webserver.use(bodyParser.json());
    webserver.use(bodyParser.urlencoded({ extended: true }));

    // set up handlebars ready for tabs
    webserver.engine('hbs', hbs.express4({partialsDir: __basedir + 'views/partials'}));
    webserver.set('view engine', 'hbs');
    webserver.set('views', __basedir + 'views/');

    webserver.use(express.static('public'));

    var server = http.createServer(webserver);

    server.listen(config.launcher.web.port || 3000, null, function() {

        debug('Express webserver configured and listening at http://localhost:' + config.launcher.web.port || 3000);

    });
    /*
    // import all the pre-defined routes that are present in /components/routes
    var normalizedPathToRoutes = require('path').join(__dirname, 'routes');
    if (fs.existsSync(normalizedPathToRoutes)) {
        fs.readdirSync(normalizedPathToRoutes).forEach(function (file) {
            require('./routes/' + file)(webserver, controller);
        });
    }
    */
    controller.webserver = webserver;
    controller.httpserver = server;

    return controller;
    //return webserver;

};
