const db = require('../config/database').db;
const passport = require('passport');
const User = db.model('User');

module.exports = (function () {
	passport.serializeUser((user, done) => {
		if (!user) {
			return done(null, false);
		}

		return done(null, user.id);
	});

	passport.deserializeUser((id, done) => {
		User.findById(id).then(user => {
			if (!user) {
				return done(null, false);
			}

			return done(null, user);
		});
	});
    
	require('./strategies/local-strategy')();
    
})();
