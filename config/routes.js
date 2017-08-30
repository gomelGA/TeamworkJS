const userController = require('./../controllers/user');
const homeController = require('./../controllers/home');

module.exports = (app) => {
    app.get('/', homeController.index);

    app.get('/register', userController.registerGet);
    app.post('/register', userController.registerPost);

    app.get('/login', userController.loginGet);
    app.post('/login', userController.loginPost);

    app.get('/logout', userController.logout);
};

