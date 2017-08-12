//For encryption of passwords
const CryptoJS = require("crypto-js");

/**
 * @param {express()} app
 * @param {urlencoded()} urlParser
 */
module.exports = function HomeController(app, urlParser) {
    app.get('/', function(req, res) {
        res.render('test');
    });

    //These are just testing functions.
    app.post('/testForm', urlParser, function(req, res) {

        let passedData = {
            username: req.body.username,
            password: password
        };
        res.render('testForm', passedData);
    });

    app.get('/ajaxReq', urlParser, function(req, res) {
        res.json({name:"Sam", surname:"Jackson"});
    });
}