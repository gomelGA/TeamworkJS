const express = require('express'),
	eventRouter = express.Router(),
	eventController = require('../controllers/event');


var router = (function () {

	eventRouter.use(function(req,res,next){
		if(!req.user){
		  return res.redirect('/');
        }
        next();
	});
    
	eventRouter.get('/create', function (req, res) {
		res.render('events/createForm');
	});

	eventRouter.post('/create', function (req, res) {
		//Third parameter is a callback function
		eventController.createEvent(req, res);
	});

	eventRouter.get('/edit/:id', function (req, res) {
		let id = req.params.id;
        
		eventController.getEventById(id).then(e => {
			res.render('events/editForm',{event: e});
		}).catch(err => {
			console.log(err);
			console.log(`Event with ${id} doesn't exsist!`);
			res.redirect('/');
		});
	});

	eventRouter.post('/edit/:id', function (req, res) {
		let id = req.params.id;
        
		eventController.editEvent(id,req.body, () => {
			res.redirect('/'); 
		});

	});
    
	eventRouter.post('/delete/:id',function(req,res){
		eventController.deleteEvent(req.params.id, () => {
			res.redirect('/');
		});
	});

	return eventRouter;

})();

module.exports = router;
