// Load required lib
var Log = require(__basedir + 'lib/log');
var fs = require('fs');

// Get CSV data
exports.get_csv_data = function(file, call_back) {
    Log.debug('tools get_csv_data ' + file);
    fs.readFile(file, function(err, data) {
        if(err) throw err;
        call_back(exports.csv_extract(data));
    });
};

exports.get_csv_data_sync = function(file){
    var data = fs.readFileSync(file);
    var array = data.toString().split("\n");
};

exports.csv_extract = function(data){
    var strs = [];
    var array = data.toString().split("\n");
    for(var i = 0; i < array.length - 1; i++) {
        var lineArr = array[i].split(';');
        strs.push(lineArr);
    }
    return strs;
};
