const express = require('express'),
	app = express(),
	cookieParser = require('cookie-parser'),
	bodyParser = require('body-parser'),
	session = require('express-session'),
	passport = require('passport'),
	logger = require('morgan')('dev');

// View engine setup.
app.set('view engine', 'hbs');

//Public folder
app.use(express.static('public'));

//Morgan with dev mode set on to log the requests
app.use(logger);

// This set up which is the parser for the request's data.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

// We will use cookies.
app.use(cookieParser());

// Session is storage for cookies, which will be de/encrypted with that 'secret' key.
app.use(session({
	secret: 's3cr3t5tr1ng',
	resave: false,
	saveUninitialized: false
}));

// For user validation we will use passport module.
app.use(passport.initialize());
app.use(passport.session());

//Initializing mongoose connection and models
require('./config/database');
//Adding the main functions in passport
require('./config/passport');

app.use((req, res, next) => {
	if (req.user) {
		res.locals.user = req.user;
	}

	next();
});

app.use(function(err,req,res,next){
	console.log(err); 
	next();
});

const userRouter = require('./routes/userRouter'),
	homeRouter = require('./routes/homeRouter'),
	eventRouter = require('./routes/eventRouter'),
	userRouterProtected = require('./routes/userRouterProtected');
/**
 * Setting up the routers as intermediaries and middleware
 * instead of using the controllers here
 * Routers use controllers explicitly
 */

app.use('/', homeRouter);

app.use('/users', userRouter);
app.use('/users', userRouterProtected);

app.use('/events', eventRouter);



app.listen(3000, function () {
	console.log('Example app listening on port 3000!');
});
