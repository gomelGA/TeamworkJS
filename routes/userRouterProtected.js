const express = require('express'),
	userRouterProtected = express.Router(),
	userController = require('../controllers/user');
/*
 * Functions passed as parameters work as callbacks with eventual error handling
 */
var router = (function () {

	userRouterProtected.use(function(req,res,next){  
		if(!req.user){
			return res.redirect('/');
		}      
		return next();
	});

	userRouterProtected.get('/myprofile', function (req, res) {
		console.log('124');
		res.render('user/myProfile');
	});

	userRouterProtected.post('/logout', function (req, res) {
		userController.logout(req, res);
	});

	return userRouterProtected;

})();

module.exports = router;
