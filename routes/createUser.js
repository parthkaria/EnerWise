/**
 * Created by parthk on 11/12/2015.
 */
var express = require('express');
var router = express.Router();
var createUserCtrl = require('../controller/createUserCtrl');

/* Post user Object */
router.post('/', function(req, res, next) {
    console.log("inside post create user");
    createUserCtrl.saveUser(req.body.user);
    res.send("user successfully created");
});

/* Put user Object */
router.put('/update', function(req, res, next) {
    console.log("inside put create user");
    createUserCtrl.updateUser(req.body.user);
    res.send("user successfully updated");;
});

module.exports = router;
