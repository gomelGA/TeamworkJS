const express = require('express'),
	userRouter = express.Router(),
	userController = require('../controllers/user'),
	passport = require('passport');

/*
 * Functions passed as parameters work as callbacks with eventual error handling
 */
var router = (function () {


	userRouter.use(function (req, res, next) {
		if (req.user) {
			res.redirect('/');
		}

		next();
	});

	userRouter.get('/login', function (req, res) {
		res.render('user/login');
	});

	userRouter.post('/login', function (req, res, next) {
		passport.authenticate('local', function (err, user) {
			if (err) {
				return res.render('user/login', {
					error: err
				});
			}
			if (!user) {
				return res.render('user/login', {
					error: 'Incorrect username or password!'
				});
			}
			req.login(user, function (err) {
				if (err) {
					return res.render('user/login', {
						error: err
					});
				}
                
			});
			res.redirect('/users/myprofile');
		})(req, res, next);
	});

	userRouter.get('/register', function (req, res) {
		res.render('user/register');
	});

	userRouter.post('/register', function (req, res) {
		userController.registerUser(req, res);
	});

	return userRouter;

})();

module.exports = router;
