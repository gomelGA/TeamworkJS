//Controllers
var HomeController = require('./controllers/HomeController');


//Execution
module.exports = function(app, urlParser) {
    HomeController(app, urlParser);
};
