require('../models/UserSchema');
require('../models/EventSchema');

const mongoose = require('mongoose');

var url = 'mongodb://softuni_user:mag1karp@ds055875.mlab.com:55875/softuni_project';

var options = {
  
	useMongoClient: true
    
};

var db = mongoose.createConnection(url, options);
module.exports = {
	db: db
};