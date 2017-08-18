const express = require('express');
const expresshbs = require('express-handlebars');

/**
 * Require all routers
 */
const homeRouter = require('./routes/homeRouter');
const userRouter = require('./routes/userRouter');

global.configs = require('./config.js');

var app = express();
//Setting up handlebars
app.engine('handlebars', expresshbs({}));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

/**
 *
 * Body-Parser allows us to parse the request body and use it as json object
 * Json parser and urlParser are set as middleware instead of passed on every object instance
 * which requires it!
 *
 */
const bdp = require('body-parser');
var urlParser = bdp.urlencoded({extended: false});
var jsonParser = bdp.json();

app.use(urlParser);
app.use(jsonParser);

app.use('/',homeRouter);
app.use('/user',userRouter);

//Setting up Body-Parser (For POST actions)

//Routing
//var routes = require('./routes');
//routes(app, urlParser);

//Listen on 127.0.0.1:3000/localhost:3000
app.listen(3000);