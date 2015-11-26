
var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var createUserCtrl = require('../controller/loginCtrl');
var UserHouse=require('../models/user_house');

router.post('/',
    function(req, res, next) {
        passport.authenticate('local',{session:true},function(err,user,info){
            console.log(info);
            if(!user) {
                info.successFlag=false;
                res.send(info);
            }
            else
            {
                req.logIn(user, function (err) {
                    console.log("error in req login");
                });
                console.log(req.isAuthenticated());
                var info= {};
                info.successFlag=true;
                info.user=user[0];
                res.send(info);
            }
        })(req, res, next);
    }
);

module.exports = router;
