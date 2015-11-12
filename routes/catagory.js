/**
 * Created by mansi2392 on 28-Oct-15.
 */

var express = require('express');
var router = express.Router();
var categories = require('../controller/catagory.server.controller');

/* GET users listing. */
/*router.get('/', function(req, res, next) {
    res.json([{name:'Beverages'},{name:'Condiments'}]);
});*/


router.get('/',categories.list);
router.post('/',categories.create);
module.exports = router;
