/**
 * Created by parthk on 11/12/2015.
 */
exports.saveUser=function(userObj){
    console.log(userObj);
    var pg = require('pg');
    var connectionString ='postgres://rdpenjpi:YkKrx4t3SxVm3F54KGYIQ8ASfZ6_uy0g@pellefant.db.elephantsql.com:5432/rdpenjpi';
    var client = new pg.Client(connectionString);
    client.connect();
    var query = client.query('INSERT INTO user (first_name,last_name,email,password,role) VALUES ('+userObj.firstname+','+userObj.lastname+','+userObj.email+','+userObj.password+',admin);');
    query.on('end', function() { client.end(); });
};