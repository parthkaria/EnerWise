var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    var mongoose=req.app.get("mongooseVar");
    var Product = mongoose.model('Product',{name :String});
    var name="";
    Product.findOne(
        {},function(error,product){
            console.log(product.get("name"));
            name=product.name;
        }
    );
    console.log(name);
});

module.exports = router;
