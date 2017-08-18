const CryptoJS = require('crypto-js');
const userService = require('../services/userService');

/**
 * @param {express()} app
 * @param {urlencoded()} urlParser
 */
module.exports = function UserController() {
    
	function registerUser(req,res){
		const UserSchema = require('../schemas/UserSchema');
		let password = CryptoJS.AES.encrypt(req.body.password,'123456789');

        if(userService.userExists(req.body.username)){
            res.redirect('/');
        }
        
		let newUser = new UserSchema({
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
