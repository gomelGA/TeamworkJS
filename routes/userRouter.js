const express = require('express'),
    userRouter = express.Router(),
    userController = require('../controllers/user');


var router = (function () {

    userRouter.get('/login', function (req, res) {
        res.render('user/login');
    });

    userRouter.get('/register', function (req, res) {
        res.render('user/register');
    });

    userRouter.post('/register', function (req, res) {
        userController.registerUser(req, res);
    });

    return userRouter;

})();

module.exports = router;
