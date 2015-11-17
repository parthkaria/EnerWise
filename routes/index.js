var express = require('express');
var router = express.Router();
var passport = require('passport');
var passportLocal = require('passport-local');

/* GET home page. */
router.get('/', function(req, res, next) {
/*  res.render('index', { title: 'Express' });*/
    if(req.isAuthenticated())
    {
        console.log("authenticated");
    }
    else {
        console.log("not authenticated");
    }
    res.redirect('index.html');
});

module.exports = router;
