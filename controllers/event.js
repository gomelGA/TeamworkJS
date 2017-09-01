const User = require('mongoose').model('User')
const Event = require('mongoose').model('Event')

module.exports = {
  creationFormGet: (req, res) => {
    res.render('eventForms/createForm')
  },
  creationFormSubmit: (req, res) => {
    let eventParams = req.body
    // TODO
    /* must validate the article params
        and user authentication logick
        als0 to create the new article in the db
        also to push the article id in the userCreatedArticles
        after creation must be redirected to view with events
        */

    let articleValidation = validateArticle(eventParams)
    let authenticationValidation = authentication(req)

    // validation logick TODO
    // if(articleValidation!=""){
    //     //TODO this is only diplayed on the server console, not to the User
    //     console.log(articleValidation)
    //     return
    // }

    // if(authenticationValidation!=""){
    //     console.log(authenticationValidation)
    //     return
    // }

    console.log(eventParams)
    eventParams.tags = eventParams.tags.split(',')
    eventParams.author = req.user.id

    if (eventParams.img == '') {
      delete eventParams.img
    }

    Event.create(eventParams).then(event => {
      req.user.eventsCreated.push(event.id)

      req.user.save(err => {
        if (err) {
          console.log(err)
        } else {
          res.redirect('/')
        }
      })
    })

    console.log(req.body)
  },
  editFormGet: (req, res) => {
    let eventId = req.params.id

    Event.findOne({ _id: eventId }).then(event => {
      console.log(event)
      event.eventDate = event.eventDate.toString()

      console.log(event)
      
      event.tags = event.tags.join(',')
      res.render('eventForms/editForm', { event })
    })
  },
  editFormSubmit: (req, res) => {
    let eventId = req.params.id
    let updatedEvent = req.body
    updatedEvent.tags = updatedEvent.tags.split(',')

  // TODO make validation


    Event.update({ _id: eventId }, { $set: updatedEvent }).then(err => {
      res.redirect('/')
    })
  },

  deleteSubmit:(req,res)=>{

    let articleId = req.params.id
  // TODO make validation
    Event.findOne({_id:articleId}).remove().then(x=>{
        res.redirect('/profile')
    })

  }
}

function validateArticle (article) {
  let errMsg = ''
  // TODO make validation

  return errMsg
}

function authentication (req) {
  let errMsg = ''
  if (!req.isAuthenticated()) {
    errMsg = 'U are not authorized'
  }
  return errMsg
}
