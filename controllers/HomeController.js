//For encryption of passwords
const CryptoJS = require("crypto-js");

const mongoose = require('mongoose');
var db = mongoose.createConnection('mongodb://softuni_user:mag1karp@ds055875.mlab.com:55875/softuni_project');

console.log(db.collections);

/**
 * @param {express()} app
 * @param {urlencoded()} urlParser
 */
module.exports = function HomeController(app, urlParser) {
    app.get('/', function(req, res) {
        res.render('test');
    });

    app.post('/testForm', urlParser, function(req, res) {
        let password = CryptoJS.AES.encrypt(req.body.password, 'SoftUniProject');

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