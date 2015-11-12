/**
 * Created by parthk on 11/12/2015.
 */
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    console.log("inside create user");
    //console.log(req);
});
/* GET users listing. */
router.post('/', function(req, res, next) {
    console.log("inside post create user");
    //console.log(req);
});
module.exports = router;
