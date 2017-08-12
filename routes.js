//Controllers
var HomeController = require('./controllers/HomeController');
var UserController = require('./controllers/UserController');

//Execution
module.exports = function(app, urlParser) {
    HomeController(app, urlParser);
    UserController(app, urlParser);
};
