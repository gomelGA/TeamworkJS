const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let UserModel = new Schema({
	username: String,
	password: String,
	age: Number,
	gender: String,
});

mongoose.model('User',UserModel);

module.exports = UserModel;