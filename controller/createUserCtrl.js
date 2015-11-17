/**
 * Created by parthk on 11/12/2015.
 */

var nodemailer = require("nodemailer");
var fs=require('fs');
var PropertiesReader = require('properties-reader');
var properties = PropertiesReader('config/mail.properties');
var User=require('../models/user');

var smtpTransport= nodemailer.createTransport({
   service:"Gmail",
    auth:{
        user:properties.get('mailconf.username'),
        pass:properties.get('mailconf.password')
    }
});

var mailOptions={
    from : properties.get('mailconf.fromText'),
    to : '',
    subject : 'Welcome',
    html: ''
};

fs.readFile('config/welcomemail.html',function(err,content){
    mailOptions.html=content.toString();
});


exports.saveUser=function(userObj){
/*    console.log(userObj);*/
    mailOptions.to=userObj.email;
//    console.log(mailOptions);
    var pg = require('pg');
    var connectionString ='postgres://rdpenjpi:YkKrx4t3SxVm3F54KGYIQ8ASfZ6_uy0g@pellefant.db.elephantsql.com:5432/rdpenjpi';
    var client = new pg.Client(connectionString);
    client.connect();
    var query = client.query('INSERT INTO public.user (first_name,last_name,email,password,role) VALUES (\''+userObj.firstname+'\',\''+userObj.lastname+'\',\''+userObj.email+'\',\''+userObj.password+'\',\''+userObj.type+'\');');
    query.on('end', function() { client.end(); });

    smtpTransport.sendMail(mailOptions,function(err,response){
       if(err)
       {
           console.log(err);
       }
        else
       {
           console.log("Message Sent: "+response.message);
       }
    });

};

exports.updateUser=function(req,res,next){
  console.log(req.body.user);
  /*  User.find({ where: {id: req.body.user.userId} }).success(function(userObj) {
        if (userObj) { // if the record exists in the db
        //    userObj.updateAttributes({
        //        last_name: req.body.user.lastname
        //    }).success(function(data) {
        //        console.log(data);
        //    });
            console.log("hmm mle to chhe");

        }
        else{
            console.log("hmm nthi mltu");

        }
    }).failure(function(err){
       console.log(err);
    });*/

    var userObj=req.body.user;
    var user1=User.build({id:userObj.userId,first_name:'',password:'',last_name:'hmmm',email:'mkataria920@gmail.com',created_at:now(),updatedAt:now()});
    user1.last_name=userObj.lastname;
    user1.update(function(err){
        console.log(err);
    });
};
