const db = require('../config/database').db;
const User = db.model('User');
const encryption = require('./../utilities/encryption');

module.exports = {
	registerUser: (req, res) => {
		let registerArgs = req.body;

		User.findOne({
			email: registerArgs.email
		}).then(user => {
			let errorMsg = '';
			if (user) {
				errorMsg = 'User with the same username exists!';
			} else if (registerArgs.password !== registerArgs.repeatedPassword) {
				errorMsg = 'Passwords do not match!';
			}

			if (errorMsg) {
				res.render('user/register', {
					error: errorMsg
				});
			} else {
				let salt = encryption.generateSalt();
				let passwordHash = encryption.hashPassword(registerArgs.password, salt);

				let userObject = {
					email: registerArgs.email,
					password: passwordHash,
					fullName: registerArgs.fullName,
					salt: salt
				};

				User.create(userObject).then(user => {
					req.login(user).then((err) => {
						if (err) {
							res.render('user/register', {
								error: errorMsg
							});
							return;
						}
						res.redirect('/');
					});
				});
			}
		});
	},


	//loginUser: (req, res) => {
	//	let loginArgs = req.body;
	//	User.findOne({
	//		email: loginArgs.email
	//	}).then(user => {
	//		if (!user || !user.authenticate(loginArgs.password)) {
	//			let errorMsg = 'Either username or password is invalid!';
	//			return errorMsg;
	//		}
	//        
	//		req.logIn(user, function (err) {
	//			return err;
	//		});
	//	});
	//},

	logout: (req, next) => {
		req.logout();
		next();
	},


};
