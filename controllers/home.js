const Event = require('mongoose').model('Event')

module.exports = {
  index: (req, res) => {
    Event.find({})
      .sort({ eventDate: -1 })
      .limit(12)
      .populate('author')
      .then(elems => {
        let auth = false
        if (req.user) {
          elems.map(x => (x.user = true))
        }
        res.render('home/index', { elems, auth })
      })
  },
  profileView: (req, res) => {
    let currentUserId = req.user.id
    let atend = req.user.cart

    Event.find({ author: currentUserId }).sort({ eventDate: -1 }).then(elems =>
      Event.find({ _id: { $in: atend } }).then(myEvents => {
        {
          res.render('user/myProfile', { elems, myEvents })
        }
      })
    )
  }
}
