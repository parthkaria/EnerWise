/**
 * Created by mansi2392 on 28-Oct-15.
 */
/**
 * Created by mansi2392 on 28-Oct-15.
 */


require("../models/catagory.server.model");
var mongoose = require('mongoose');
var catagorySchema= mongoose.model('catagory');

exports.list= function(req,res) {
    catagorySchema.find().exec(function (err, catagories) {
        if (err) {
            return res.status(400).send({
                message: "sample error message"
            });
        }
        else {
            res.json(catagories);
        }
    });
}
    /*exports.create=function(req,res){
        var catagory=new catagorySchema({
            name:req.body.name,
            description:req.body.desc
        });
        catagory.save(function(err){
            if(err)
            {
                console.log("error while saving");
            }
            else
            {
                res.status(201).json(catagory);
            }
        });
    };*/

    exports.create=function(req,res){
        var catagory={name:req.body.name,description:req.body.desc};
        catagorySchema.create(catagory,function(error,addedCatagory){
            if (error) {
                res.send(500, { error: error });
            }
            else {
                res.send({ success: true, emp: addedCatagory });
            }
        });

    };
