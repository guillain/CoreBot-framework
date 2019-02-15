// Load required library
var Log = require(__basedir + 'lib/log');
var path = require('path');
var fs = require('fs');

exports.search_file = function(startPath, filter, callback){
    Log.debug("lib file " + startPath + ' ' + filter);
    
    if (!fs.existsSync(startPath)){
        console.log("lib file no dir ",startPath);
        return;
    }
    
    var files=fs.readdirSync(startPath);
    for(var i=0;i<files.length;i++){
        var filename=path.join(startPath,files[i]);
        var stat = fs.lstatSync(filename);
        if (stat.isDirectory()){
            exports.search_file(filename,filter,callback); //recurse
        }
        else if (filter.test(filename)) callback(filename);
    }
};

/*
var v = 'default.json';
var re = new RegExp(v);
exports.search_file('../controller', re, function (filename) {
    console.log(filename);
});
*/
