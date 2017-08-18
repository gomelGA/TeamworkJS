const CryptoJS = require('crypto-js');

/**
 * @param {express()} app
 * @param {urlencoded()} urlParser
 */
module.exports = function UserController() {
    
	function registerUser(req,res){
		const UserSchema = require('../schemas/UserSchema');
		let User = global.configs.db.model('User',UserSchema);
		let password = CryptoJS.AES.encrypt(req.body.password,'123456789');

		console.log(req.body.username);

		let newUser = new User({
			username: req.body.username,
			password: password.toString(),
			age: req.body.age,
			gender: req.body.gender,
		});
        
		newUser.save();
		res.redirect('/');
		// // Uncomment if you want to descrypt a password.
		// // Don't know why you would though :D
		// let descr = CryptoJS.AES.decrypt(password, '123456789');
		// console.log(descr.toString(CryptoJS.enc.Utf8));
	}
    
	return {
		registerUser
	};
	
};
