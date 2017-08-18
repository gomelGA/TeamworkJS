//For encryption of passwords
//const CryptoJS = require('crypto-js');

/**
 * @param {express()} app
 * @param {urlencoded()} urlParser
 */
module.exports = function HomeController() {

	function getIndex(req, res) {
		res.render('test');
	}

	function testAjaxReq(req, res) {
		res.json({
			name: 'Sam',
			surname: 'Jackson'
		});
	}

	//These are just testing functions.
	function testForm(req,res) {
		let passedData = {
			username: req.body.username,
			password: req.body.password
		};
		res.render('testForm', passedData);
	}

	return {
		getIndex,
		testAjaxReq,
		testForm
	};
};
