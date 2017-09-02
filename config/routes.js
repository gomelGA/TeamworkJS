const userController = require('./../controllers/user')
const homeController = require('./../controllers/home')
const eventController = require('./../controllers/event')

module.exports = app => {
  app.get('/', homeController.index)

  app.get('/register', userController.registerGet)
  app.post('/register', userController.registerPost)

  app.get('/login', userController.loginGet)
  app.post('/login', userController.loginPost)

  app.get('/logout', userController.logout)

  app.get('/createEvent', eventController.creationFormGet)
  app.post('/createEvent', eventController.creationFormSubmit)

  app.get('/editEvent:id',eventController.editFormGet)
  app.post('/editEvent:id',eventController.editFormSubmit)

  app.get('/deleteEvent:id',eventController.deleteSubmit)

  app.get('/profile', homeController.profileView)

  app.get('/buyTicket:id', eventController.getBuyTicket)
  app.post('/buyTicket:id', eventController.submitBuyTicker)
}
