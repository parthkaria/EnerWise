/**
 * Created by mansi on 18/11/15.
 */

var express = require('express');
var router = express.Router();
var homeCtrl = require('../controller/homeCtrl');

/* Post home Object */
router.post('/', function(req, res, next) {
    console.log("inside post save home");
    console.log(req.user);
    homeCtrl.createHome(req.body.homeinfo);
});
module.exports=router;