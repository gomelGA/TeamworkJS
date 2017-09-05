const express = require('express'),
	homeRouter = express.Router(),
	homeController = require('../controllers/home');

/**
 *
 * I think we should seperate the routing from the controllers
 * since it will look cleaner
 * Home Router "/"
 *
 */

var router = (function () {
	homeRouter.get('/', function (req, res) {
		homeController.listEvents(req, res);
	});

	homeRouter.get('/ajaxReq', function (req, res) {
		homeController.testAjaxReq(req, res);
	});

	homeRouter.post('/testForm', function (req, res) {
		homeController.testForm(req,res);
	});

	return homeRouter;
})();

module.exports = router;
