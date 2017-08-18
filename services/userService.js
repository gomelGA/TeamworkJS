/**
 *
 * This service's sole purpose is to interact with the 3rd party cloud storage provider
 * Everything related to users database interaction will be created and controlled here
 *
 */

var db = require("../config").db;

var userService = (function () {

    
    
    function userExists(username){
        
        if(typeof(username) !== 'String'){
            return true;
        }
        
    }
    
    
    return {
        
    }

});


module.exports = userService;
