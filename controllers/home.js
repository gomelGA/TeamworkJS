const db = require('../config/database').db;
const Event = db.model('Event');

var homeController = (function() {
    
	function listEvents(req, res){
        
		Event.find({})
			.sort({
				eventDate: -1
			})
			.limit(12)
			.populate('author')
			.then(elems => {
				let auth = false;
				if (req.user) {
					elems.map(x => (x.user = true));
				}
				res.render('home/index', {
					elems, auth
				});
			});
	}
    
	function getProfileView(req, res){
		let currentUserId = req.user.id;
		let atend = req.user.cart;

		Event.find({
			author: currentUserId
		}).sort({
			eventDate: -1
		}).then(elems =>
			Event.find({
				_id: {
					$in: atend
				}
			}).then(myEvents => {
				{
					res.render('user/myProfile', {
						elems, myEvents
					});
				}
			})
		);
	}

	return {
		listEvents,
		getProfileView
	};
    
})();

module.exports = homeController;
