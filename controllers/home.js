const Event = require('mongoose').model('Event')

module.exports = {
  index: (req, res) => {

      Event.find({}).sort({eventDate:-1}).limit(12).populate('author').then(elems=>{
        console.log(elems)
        res.render('home/index',{elems})
      })

  }
};


// elemnts=>{
//         console.log(elemnts)
//               res.render('home/index')