const passport = require('passport');

var passportStrategy = (function(){
    
    passport.serializeUser(function(user,done){
        
        
        
    });
    
    passport.deserializeUser(function(user,done){
        done(err, user);
    });
    
    
});

module.exports = passportStrategy;