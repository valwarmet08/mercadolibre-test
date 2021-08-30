class SessionChecker {
  
    constructor(){
        this.routesValidateSession  = ["login"]
    }
   
    validateSession = (req, res, next) => {
        let split_route = req.originalUrl.split("/");
        //token
        if( this.validateRoute(split_route[1]) ){
            if ( req.session.user && req.cookies.user_sid ) {
                res.redirect('/dashboard');
            } else {
                next();
            }    
        }else{
            next();
        }
    }

    validateRoute(route){
        return this.routesValidateSession.indexOf(route) > -1 ? true : false  
    }


};

module.exports = new SessionChecker();