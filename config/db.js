const mongoose = require('mongoose');

var URI = 'mongodb://softuni_user:mag1karp@ds055875.mlab.com:55875/softuni_project';

//var options = {
//	useMongoClient: true,
//};

var db;

var options = {
    useMongoClient: true
};

mongoose.connect(URI, options,function(err,database){
	if(err) {
        throw err;
    }
	db = database;
    console.log("Connection to mLab Cloud Service was Established Successfully")
});


//let db = mongoose.connect(URI, options);

//mongoose.connection.on("error",function(){
//    console.log('Something went wrong with when connecting to mLab Cloud Service');
//});

//mongoose.connection.on("connected",function(){
//    console.log(db);
//    console.log('Connection to mLab Cloud Service Established')
//});
 

module.exports = {
	db: db,
	bodyWrapper: 'wrapper',
};
