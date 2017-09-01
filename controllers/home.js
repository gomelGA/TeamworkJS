const Event = require('mongoose').model('Event')

module.exports = {
  index: (req, res) => {

      Event.find({}).sort({eventDate:-1}).limit(12).populate('author').then(elems=>{
   
        res.render('home/index',{elems})
      })

  },
  profileView: (req,res) =>{
  let currentUserId = req.user.id

  Event.find({'author':currentUserId}).sort({eventDate:-1}).then(elems=>{


    res.render('user/myProfile',{elems})
  })


  
    }
};
