
var express = require('express');
var router = express.Router();
var helperdataCtrl = require('../controller/helperdataCtrl');
/* Post user Object */
router.get('/states', function(req, res, next) {
    console.log("request for states");
    helperdataCtrl.getStates(req,res);
    //res.send("sample state");
});

router.get('/cities/:state', function(req, res, next) {
    console.log("request for Cities");
    helperdataCtrl.getCities(req,res);
});
module.exports = router;
