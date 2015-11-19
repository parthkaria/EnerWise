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
    console.log(userObj);
    mailOptions.to=userObj.email;
    User
        .build({first_name: userObj.firstname, last_name: userObj.lastname,email:userObj.email,password:userObj.password,role:userObj.role })
        .save()
        .then(function() {
           console.log("signup successful");
            // you can now access the currently saved task with the variable anotherTask... nice!
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
        }).catch(function(error) {
        // Ooops, do some error-handling
        console.log("error signing up"+error);
    })
};

exports.updateUser=function(userObj){
    User.find({
        where: {
            id: userObj.userId
        }
    }).then(function (userTmp) {
        console.log(userTmp);
        if (userTmp) {
            userTmp.updateAttributes({
                email: userObj.email,
                password:userObj.password,
                first_name:userObj.firstname,
                last_name:userObj.lastname
            }).then(function (data) {
                console.log(data);
            });
        }
    });

};
