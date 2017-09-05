const User = require('mongoose').model('User');
const Event = require('mongoose').model('Event');

module.exports = {

	/**
     * Param next represents a callback function which is executed on success
     */
	createEvent: (req, res, next) => {
		let eventParams = req.body;
		// TODO
		/* must validate the article params
        and user authentication logick
        als0 to create the new article in the db
        also to push the article id in the userCreatedArticles
        after creation must be redirected to view with events
        */

		//let articleValidation = validateArticle(eventParams);
		//let authenticationValidation = authentication(req);



		eventParams.tags = eventParams.tags.split(',');
		eventParams.author = req.user.id;

		if (eventParams.img === '') {
			delete eventParams.img;
		}

		Event.create(eventParams).then(event => {
			req.user.eventsCreated.push(event.id);
			req.user.save(err => {
				if (err) {
					console.log(err);
				} else {
					next();
				}
			});
		});

	},
	editEvent: (id,eventBody,next) => {
		let eventId = id;
		let updatedEvent = eventBody;
		updatedEvent.tags = updatedEvent.tags.split(',');

		// TODO make validation

		Event.update({ _id: eventId }, { $set: updatedEvent }).then(err => {
			//LogErr
			console.log(err);
			//Later we will transition to logger maybe
			next();
		});
	},
	deleteEvent: (id, next) => {

		let eventId = id;
		// TODO make validation
		Event.findOne({_id: eventId}).remove().then(()=>{
            
			next();
		}).catch(err =>{
			console.log(err);
		});

	},
	getEventById: (id) => {

		//This should be handled
		if(typeof id !== 'string'){
			throw new Error('Invalid Id');
		}
        
		let eventId = id;

		//Returns a promise
		return Event.findOne({_id:eventId});  
	},
    
	buyTicket : (req,res)=>{
		let eventId = req.params.id;
		let userId = req.user._id;

		Event.update({_id:eventId},{$addToSet:{atendants:userId}}).then(()=>{
			User.update({_id:userId},{$addToSet:{cart:eventId}}).then(()=>{
				res.redirect('/profile');
			});
		});

	}
};
//For Later incorporation !!
//function validateArticle (article) {
//	let errMsg = '';
//	// TODO make validation
//    console.log("TODO: Validate "+article);
//    //Temporary usage of article
//	return errMsg;
//}
//
//function authentication (req) {
//	let errMsg = '';
//	if (!req.isAuthenticated()) {
//		errMsg = 'U are not authorized';
//	}
//	return errMsg;
//}
