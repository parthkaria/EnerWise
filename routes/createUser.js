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
});
module.exports = router;
