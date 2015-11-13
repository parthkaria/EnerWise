/**
 * Created by parthk on 11/12/2015.
 */

var nodemailer = require("nodemailer");
var fs=require('fs');
var PropertiesReader = require('properties-reader');
var properties = PropertiesReader('config/mail.properties');

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