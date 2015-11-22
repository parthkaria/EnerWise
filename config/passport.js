/**
 * Created by mansi on 14/11/15.
 */

var passportLocal = require('passport-local');
var User=require('../models/user');

module.exports = function(passport) {
    passport.serializeUser(function(user,done){
        done(null,user);
    });

    passport.deserializeUser(function(user,done){
        //query database for entire userobj based on id
        done(null,user);
    });

    passport.use(new passportLocal.Strategy(
        {
            usernameField : 'email',
            passwordField : 'password'
        },
        function(username,password,done){
            User.findAll({
                where: {
                    email: username
                }
            }).then(function (user) {
                console.log(user.length);
                if(user.length==0)
                {
                    return done(null,null,{
                        message: 'Username does not exists'
                    });
                }
                else if(user[0].password!=password)
                {
                    return done(null,null,{
                        message: 'Invalid password, please try again'
                    });
                }
                else
                {
                    // hiding password
                  //  user[0].password=undefined;
                    return done(null,user);
                }
            });

        }
    ));
};
