const express = require('express');
const expresshbs = require('express-handlebars');
const bdp = require('body-parser');

var app = express();

//Setting up handlebars
app.engine('handlebars', expresshbs({defaultLayout: "main"}));
app.set('view engine', 'handlebars');
app.use(express.static('public'));

//Setting up Body-Parser (For POST requests)
var urlParser = bdp.urlencoded({extended: false});

//Routing
var routes = require('./routes');
routes(app, urlParser);

//Listen on 127.0.0.1:3000/localhost:3000
app.listen(3000);