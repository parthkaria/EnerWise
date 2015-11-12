/**
 * Created by mansi2392 on 28-Oct-15.
 */

var mongoose= require('mongoose');
var Schema=mongoose.Schema;

function validationLength(l){
    return l.length<15;
}


var catagorySchema = new Schema({
    created : {
        type: Date,
        default: Date.now
    },
    description:{
        type: String ,
        default : '',
        trim : true
    },
    name : {
        type: String,
        default : '',
        trim : true,
        unique : true,
        required : 'name can not be blank',
        validate: [validationLength, 'name length must be less than 15 char']
    }
});

mongoose.model("catagory",catagorySchema);

