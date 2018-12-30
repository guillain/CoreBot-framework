// Load required lib
let Log = require(__basedir + 'lib/log');
let fs = require('fs');

// Get CSV data
exports.get_csv_data = function(file, call_back) {
    Log.debug('tools get_csv_data ' + file);
    fs.readFile(file, function(err, data) {
        if(err) throw err;
        call_back(exports.csv_extract(data));
    });
};

exports.get_csv_data_sync = function(file){
    let data = fs.readFileSync(file);
    let array = data.toString().split("\n");
};

exports.csv_extract = function(data){
    let strs = [];
    let array = data.toString().split("\n");
    for(let i = 0; i < array.length - 1; i++) {
        let lineArr = array[i].split(';');
        strs.push(lineArr);
    }
    return strs;
};
