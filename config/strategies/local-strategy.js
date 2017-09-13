const db = require('../../config/database').db;
const LocalPassport = require('passport-local').Strategy;
const User = db.model('User');
const passport = require('passport');

var localStrategy = (function () {

	const authenticateUser = (username, password, done) => {
        
		User.findOne({
			email: username
		}).then(user => {
			if (!user) {
				return done(null, false);
			}

			if (!user.authenticate(password)) {
				return done(null, false);
			}

			done(null, user);
		}).catch(() => {
			done(null, false);
		});
	};
	passport.use(
		new LocalPassport({
			usernameField: 'email',
			passwordField: 'password'
		},
		authenticateUser
		)
	);

});

module.exports = localStrategy;